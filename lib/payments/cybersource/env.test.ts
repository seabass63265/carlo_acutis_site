import { beforeEach, describe, expect, it, vi } from "vitest";

const ENV_KEYS = [
  "BOFA_ENVIRONMENT",
  "BOFA_MERCHANT_ID",
  "BOFA_KEY_ID",
  "BOFA_SHARED_SECRET",
  "BOFA_PRODUCTION_READY",
];

function resetEnv() {
  for (const key of ENV_KEYS) delete process.env[key];
}

describe("getCybersourceCredentials", () => {
  beforeEach(() => {
    vi.resetModules();
    resetEnv();
  });

  it("defaults to test environment when BOFA_ENVIRONMENT is unset", async () => {
    process.env.BOFA_MERCHANT_ID = "m";
    process.env.BOFA_KEY_ID = "k";
    process.env.BOFA_SHARED_SECRET = "s";
    const { getCybersourceCredentials } = await import("./env");
    expect(getCybersourceCredentials().environment).toBe("test");
    expect(getCybersourceCredentials().host).toBe("apitest.cybersource.com");
  });

  it("throws if a required credential is missing", async () => {
    process.env.BOFA_MERCHANT_ID = "m";
    const { getCybersourceCredentials, PaymentConfigError } = await import("./env");
    expect(() => getCybersourceCredentials()).toThrow(PaymentConfigError);
  });

  it("refuses production unless BOFA_PRODUCTION_READY=true, even with valid credentials", async () => {
    process.env.BOFA_ENVIRONMENT = "production";
    process.env.BOFA_MERCHANT_ID = "m";
    process.env.BOFA_KEY_ID = "k";
    process.env.BOFA_SHARED_SECRET = "s";
    const { getCybersourceCredentials, PaymentConfigError } = await import("./env");
    expect(() => getCybersourceCredentials()).toThrow(PaymentConfigError);
  });

  it("allows production only with the explicit BOFA_PRODUCTION_READY opt-in", async () => {
    process.env.BOFA_ENVIRONMENT = "production";
    process.env.BOFA_PRODUCTION_READY = "true";
    process.env.BOFA_MERCHANT_ID = "m";
    process.env.BOFA_KEY_ID = "k";
    process.env.BOFA_SHARED_SECRET = "s";
    const { getCybersourceCredentials } = await import("./env");
    expect(getCybersourceCredentials().host).toBe("api.cybersource.com");
  });

  it("rejects a shared secret containing an embedded line break (multi-line paste)", async () => {
    process.env.BOFA_MERCHANT_ID = "m";
    process.env.BOFA_KEY_ID = "k";
    process.env.BOFA_SHARED_SECRET = "YWJjZGVm\nZ2hpams=";
    const { getCybersourceCredentials, PaymentConfigError } = await import("./env");
    expect(() => getCybersourceCredentials()).toThrow(PaymentConfigError);
  });

  it("rejects a shared secret containing a non-base64 character", async () => {
    process.env.BOFA_MERCHANT_ID = "m";
    process.env.BOFA_KEY_ID = "k";
    process.env.BOFA_SHARED_SECRET = "not valid base64!!";
    const { getCybersourceCredentials, PaymentConfigError } = await import("./env");
    expect(() => getCybersourceCredentials()).toThrow(PaymentConfigError);
  });

  it("accepts a well-formed base64 shared secret, padded or not", async () => {
    process.env.BOFA_MERCHANT_ID = "m";
    process.env.BOFA_KEY_ID = "k";
    process.env.BOFA_SHARED_SECRET = "YWJjZGVmZ2hpams=";
    const { getCybersourceCredentials } = await import("./env");
    expect(getCybersourceCredentials().sharedSecret).toBe("YWJjZGVmZ2hpams=");
  });
});
