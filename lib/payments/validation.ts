import type { DonorBillingInfo } from "./cybersource/payment";

export class DonationValidationError extends Error {}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// ISO 3166-1 alpha-2, e.g. "US".
const COUNTRY_PATTERN = /^[A-Z]{2}$/;
// Cybersource's clientReferenceInformation.transactionId must be
// letters/numbers only.
const IDEMPOTENCY_KEY_PATTERN = /^[a-zA-Z0-9]{8,50}$/;

const MAX_NAME_LENGTH = 60;
const MAX_ADDRESS_LENGTH = 100;

function requireString(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new DonationValidationError(`${field} is required.`);
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    throw new DonationValidationError(`${field} is too long.`);
  }
  return trimmed;
}

export function validateIdempotencyKey(value: unknown): string {
  if (typeof value !== "string" || !IDEMPOTENCY_KEY_PATTERN.test(value)) {
    throw new DonationValidationError("Invalid or missing idempotency key.");
  }
  return value;
}

export function validateTransientToken(value: unknown): string {
  if (typeof value !== "string" || value.length < 10 || value.length > 8000) {
    throw new DonationValidationError("Invalid or missing payment token.");
  }
  return value;
}

export function validateDonor(raw: unknown): DonorBillingInfo {
  if (!raw || typeof raw !== "object") {
    throw new DonationValidationError("Donor information is required.");
  }
  const d = raw as Record<string, unknown>;

  const email = requireString(d.email, "Email", MAX_NAME_LENGTH);
  if (!EMAIL_PATTERN.test(email)) {
    throw new DonationValidationError("Email is not valid.");
  }

  const country = requireString(d.country, "Country", 2).toUpperCase();
  if (!COUNTRY_PATTERN.test(country)) {
    throw new DonationValidationError("Country must be a 2-letter ISO code.");
  }

  return {
    firstName: requireString(d.firstName, "First name", MAX_NAME_LENGTH),
    lastName: requireString(d.lastName, "Last name", MAX_NAME_LENGTH),
    email,
    address1: requireString(d.address1, "Address", MAX_ADDRESS_LENGTH),
    city: requireString(d.city, "City", MAX_NAME_LENGTH),
    state: requireString(d.state, "State", MAX_NAME_LENGTH),
    postalCode: requireString(d.postalCode, "Postal code", 20),
    country,
  };
}
