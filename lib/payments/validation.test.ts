import { describe, expect, it } from "vitest";
import {
  DonationValidationError,
  validateDonor,
  validateIdempotencyKey,
  validateTransientToken,
} from "./validation";

describe("validateIdempotencyKey", () => {
  it("accepts a well-formed alphanumeric key", () => {
    expect(validateIdempotencyKey("abc123DEF456")).toBe("abc123DEF456");
  });

  it("rejects keys with special characters (would break clientReferenceInformation.transactionId)", () => {
    expect(() => validateIdempotencyKey("abc-123; drop table")).toThrow(DonationValidationError);
  });

  it("rejects too-short or missing keys", () => {
    expect(() => validateIdempotencyKey("abc")).toThrow(DonationValidationError);
    expect(() => validateIdempotencyKey(undefined)).toThrow(DonationValidationError);
  });
});

describe("validateTransientToken", () => {
  it("rejects missing or too-short tokens", () => {
    expect(() => validateTransientToken(undefined)).toThrow(DonationValidationError);
    expect(() => validateTransientToken("short")).toThrow(DonationValidationError);
  });

  it("accepts a plausible token string", () => {
    const token = "a".repeat(200);
    expect(validateTransientToken(token)).toBe(token);
  });
});

describe("validateDonor", () => {
  const validDonor = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    address1: "123 Main St",
    city: "Springfield",
    state: "IL",
    postalCode: "62704",
    country: "us",
  };

  it("accepts a valid donor and normalizes country casing", () => {
    expect(validateDonor(validDonor).country).toBe("US");
  });

  it("rejects an invalid email", () => {
    expect(() => validateDonor({ ...validDonor, email: "not-an-email" })).toThrow(DonationValidationError);
  });

  it("rejects a missing required field", () => {
    const { firstName: _firstName, ...rest } = validDonor;
    expect(() => validateDonor(rest)).toThrow(DonationValidationError);
  });

  it("rejects a non-2-letter country code", () => {
    expect(() => validateDonor({ ...validDonor, country: "USA" })).toThrow(DonationValidationError);
  });

  it("rejects non-object input", () => {
    expect(() => validateDonor(null)).toThrow(DonationValidationError);
    expect(() => validateDonor("jane")).toThrow(DonationValidationError);
  });
});
