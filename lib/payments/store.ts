// Durable state for the donation flow: idempotency reservations, donation
// records, and rate-limit counters.
//
// This repository has no database. Running payment routes on Vercel's
// serverless/Fluid Compute means function instances are not guaranteed to
// be reused between requests (and are never shared across regions), so an
// in-memory Map cannot be trusted for idempotency or rate limiting — a
// retried click can land on a fresh instance with no memory of the first
// attempt, producing a duplicate charge.
//
// This module is backed by Upstash Redis (HTTP-based, so it works from any
// serverless/edge runtime without connection pooling concerns) via
// @vercel/kv or the Vercel Marketplace Upstash integration. See the setup
// instructions delivered with this integration for provisioning steps.
//
// Required env vars: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or
// (when provisioned through Vercel's Storage tab / Marketplace integration
// instead of a direct Upstash account) KV_REST_API_URL + KV_REST_API_TOKEN.
// If neither pair is present, every method throws immediately rather than
// silently degrading to in-memory (and therefore unsafe) behavior — this is
// the "fail clearly when missing" requirement applied to storage, not just
// credentials.

import { Redis } from "@upstash/redis";

export class DonationStoreUnconfiguredError extends Error {
  constructor() {
    super(
      "Donation storage is not configured: set UPSTASH_REDIS_REST_URL + " +
        "UPSTASH_REDIS_REST_TOKEN, or KV_REST_API_URL + KV_REST_API_TOKEN " +
        "(Vercel's Upstash integration naming). Refusing to process " +
        "payments without durable idempotency/rate-limit state.",
    );
    this.name = "DonationStoreUnconfiguredError";
  }
}

export interface DonationRecord {
  idempotencyKey: string;
  status: "succeeded" | "declined" | "pending" | "uncertain";
  providerTransactionId: string | null;
  providerStatus: string | null;
  amountCents: number;
  currency: string;
  donorEmail: string;
  donorName: string;
  createdAt: string;
  updatedAt: string;
}

let redis: Redis | null = null;
let checkedConfig = false;

function getRedis(): Redis {
  if (!checkedConfig) {
    checkedConfig = true;
    // Vercel's Upstash integration names these KV_REST_API_URL /
    // KV_REST_API_TOKEN rather than Upstash's own UPSTASH_REDIS_REST_*
    // names. Prefer the latter (so a direct Upstash account, not routed
    // through Vercel's integration, still works unchanged) and fall back
    // to Vercel's names. KV_REST_API_TOKEN is the read/write token —
    // KV_REST_API_READ_ONLY_TOKEN is deliberately never read here, since
    // this store needs to write (reservations, donation records, rate
    // limit counters), not just read.
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (url && token) {
      redis = new Redis({ url, token });
    }
  }
  if (!redis) throw new DonationStoreUnconfiguredError();
  return redis;
}

const DONATION_KEY = (key: string) => `donation:${key}`;
const RATE_LIMIT_KEY = (bucket: string) => `ratelimit:${bucket}`;

// The reservation placeholder and the final record share one long TTL.
//
// Using a short TTL here (e.g. 10 minutes "to cover the round trip") was an
// earlier draft and is a real duplicate-charge hazard: if saveDonation()
// fails *after* Cybersource has already accepted the charge (store outage,
// crash, etc.), the reservation would otherwise expire and a later retry
// with the same idempotencyKey would be free to charge the card again. By
// giving the reservation the same long TTL as a finished record, an
// unresolved placeholder stays locked indefinitely instead of silently
// reopening — the charge route treats any existing record (including a
// still-placeholder "pending" one) as "do not charge again", and an
// unresolved one is a signal for manual reconciliation, not a free retry.
const DONATION_RECORD_TTL_SECONDS = 60 * 60 * 24 * 400; // ~13 months, for donor/tax records

/**
 * Atomically reserves an idempotency key before calling the payment
 * provider. Returns the existing record immediately if this key was already
 * reserved/completed, so retried clicks and double-submits replay the prior
 * result instead of charging the donor again.
 */
export async function reserveOrGetDonation(
  idempotencyKey: string,
): Promise<{ reserved: boolean; existing: DonationRecord | null }> {
  const client = getRedis();
  const key = DONATION_KEY(idempotencyKey);

  // NX: only set if not already present. This is the atomic compare-and-set
  // that makes concurrent duplicate requests safe.
  const placeholder: DonationRecord = {
    idempotencyKey,
    status: "pending",
    providerTransactionId: null,
    // Distinguishes "we reserved this key but never got a response back
    // from Cybersource at all" from a genuine PENDING/PENDING_REVIEW status
    // the provider returned — the latter overwrites this via saveDonation()
    // once chargeDonation() returns. If this sentinel is still here when
    // someone looks at a record later, the charge attempt never resolved
    // and needs manual reconciliation against Cybersource directly.
    providerStatus: "RESERVATION_ONLY",
    amountCents: 0,
    currency: "USD",
    donorEmail: "",
    donorName: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const didSet = await client.set(key, placeholder, {
    nx: true,
    ex: DONATION_RECORD_TTL_SECONDS,
  });

  if (didSet) {
    return { reserved: true, existing: null };
  }

  const existing = await client.get<DonationRecord>(key);
  return { reserved: false, existing };
}

export async function saveDonation(record: DonationRecord): Promise<void> {
  const client = getRedis();
  await client.set(DONATION_KEY(record.idempotencyKey), record, {
    ex: DONATION_RECORD_TTL_SECONDS,
  });
}

/**
 * Fixed-window rate limiter. `bucket` should identify the thing being
 * limited (e.g. a hashed client IP, or an IP+route combination).
 */
export async function checkRateLimit(
  bucket: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const client = getRedis();
  const key = RATE_LIMIT_KEY(bucket);

  const count = await client.incr(key);
  if (count === 1) {
    await client.expire(key, windowSeconds);
  }

  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}
