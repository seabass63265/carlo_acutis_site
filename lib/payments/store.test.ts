import { beforeEach, describe, expect, it, vi } from "vitest";

// In-memory fake standing in for Upstash's HTTP Redis client, just enough
// to exercise the NX-set-based idempotency reservation this module relies
// on for duplicate-charge prevention.
class FakeRedis {
  private store = new Map<string, unknown>();

  async set(key: string, value: unknown, opts?: { nx?: boolean; ex?: number }) {
    if (opts?.nx && this.store.has(key)) return null;
    this.store.set(key, value);
    return "OK";
  }

  async get(key: string) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  async incr(key: string) {
    const current = (this.store.get(key) as number) ?? 0;
    const next = current + 1;
    this.store.set(key, next);
    return next;
  }

  async expire() {
    return 1;
  }
}

const RedisConstructor = vi.fn().mockImplementation(() => new FakeRedis());
vi.mock("@upstash/redis", () => ({
  Redis: RedisConstructor,
}));

describe("reserveOrGetDonation", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.UPSTASH_REDIS_REST_URL = "https://fake.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "fake-token";
  });

  it("reserves a brand-new idempotency key", async () => {
    const { reserveOrGetDonation } = await import("./store");
    const result = await reserveOrGetDonation("key1");
    expect(result.reserved).toBe(true);
    expect(result.existing).toBeNull();
  });

  it("refuses to re-reserve a key that's already claimed, returning the existing record instead", async () => {
    const { reserveOrGetDonation, saveDonation } = await import("./store");

    const first = await reserveOrGetDonation("key2");
    expect(first.reserved).toBe(true);

    await saveDonation({
      idempotencyKey: "key2",
      status: "succeeded",
      providerTransactionId: "txn_123",
      providerStatus: "AUTHORIZED",
      amountCents: 2500,
      currency: "USD",
      donorEmail: "jane@example.com",
      donorName: "Jane Doe",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Simulates a retried click / double submit with the same key.
    const second = await reserveOrGetDonation("key2");
    expect(second.reserved).toBe(false);
    expect(second.existing?.status).toBe("succeeded");
    expect(second.existing?.providerTransactionId).toBe("txn_123");
  });

  it("throws DonationStoreUnconfiguredError when Redis env vars are missing", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    const { reserveOrGetDonation, DonationStoreUnconfiguredError } = await import("./store");
    await expect(reserveOrGetDonation("key3")).rejects.toBeInstanceOf(DonationStoreUnconfiguredError);
  });
});

describe("Redis credential resolution (Upstash direct vs. Vercel KV naming)", () => {
  beforeEach(() => {
    vi.resetModules();
    RedisConstructor.mockClear();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    delete process.env.KV_REST_API_READ_ONLY_TOKEN;
  });

  it("falls back to Vercel's KV_REST_API_* names when UPSTASH_* is unset", async () => {
    process.env.KV_REST_API_URL = "https://kv.example.com";
    process.env.KV_REST_API_TOKEN = "kv-read-write-token";
    const { reserveOrGetDonation } = await import("./store");
    await reserveOrGetDonation("kv-key");
    expect(RedisConstructor).toHaveBeenCalledWith({
      url: "https://kv.example.com",
      token: "kv-read-write-token",
    });
  });

  it("prefers UPSTASH_REDIS_REST_* over KV_REST_API_* when both are set", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://upstash.example.com";
    process.env.UPSTASH_REDIS_REST_TOKEN = "upstash-token";
    process.env.KV_REST_API_URL = "https://kv.example.com";
    process.env.KV_REST_API_TOKEN = "kv-read-write-token";
    const { reserveOrGetDonation } = await import("./store");
    await reserveOrGetDonation("pref-key");
    expect(RedisConstructor).toHaveBeenCalledWith({
      url: "https://upstash.example.com",
      token: "upstash-token",
    });
  });

  it("never uses KV_REST_API_READ_ONLY_TOKEN", async () => {
    process.env.KV_REST_API_URL = "https://kv.example.com";
    process.env.KV_REST_API_READ_ONLY_TOKEN = "read-only-token";
    // No KV_REST_API_TOKEN (read/write) set — should remain unconfigured
    // rather than silently using the read-only token.
    const { reserveOrGetDonation, DonationStoreUnconfiguredError } = await import("./store");
    await expect(reserveOrGetDonation("ro-key")).rejects.toBeInstanceOf(DonationStoreUnconfiguredError);
  });
});
