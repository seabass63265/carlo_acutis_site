import { beforeEach, describe, expect, it, vi } from "vitest";

const getCookieMock = vi.fn();
vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ get: getCookieMock })),
}));

describe("isValidAccessToken", () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.DONATE_PRIVATE_ACCESS_TOKEN;
    getCookieMock.mockReset();
  });

  it("rejects any token when no secret is configured", async () => {
    const { isValidAccessToken } = await import("./accessGate");
    expect(isValidAccessToken("anything")).toBe(false);
    expect(isValidAccessToken(null)).toBe(false);
  });

  it("rejects a short/weak configured secret", async () => {
    process.env.DONATE_PRIVATE_ACCESS_TOKEN = "tooshort";
    const { isValidAccessToken } = await import("./accessGate");
    expect(isValidAccessToken("tooshort")).toBe(false);
  });

  it("accepts the exact configured secret, rejects anything else", async () => {
    process.env.DONATE_PRIVATE_ACCESS_TOKEN = "a".repeat(24);
    const { isValidAccessToken } = await import("./accessGate");
    expect(isValidAccessToken("a".repeat(24))).toBe(true);
    expect(isValidAccessToken("b".repeat(24))).toBe(false);
    expect(isValidAccessToken("a".repeat(23))).toBe(false);
  });
});

describe("hasDonationAccess", () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.DONATE_PRIVATE_ACCESS_TOKEN;
    getCookieMock.mockReset();
  });

  it("fails closed when the gate token isn't configured, even with a cookie present", async () => {
    getCookieMock.mockReturnValue({ value: "whatever" });
    const { hasDonationAccess } = await import("./accessGate");
    expect(await hasDonationAccess()).toBe(false);
  });

  it("denies access with no cookie", async () => {
    process.env.DONATE_PRIVATE_ACCESS_TOKEN = "a".repeat(24);
    getCookieMock.mockReturnValue(undefined);
    const { hasDonationAccess } = await import("./accessGate");
    expect(await hasDonationAccess()).toBe(false);
  });

  it("grants access when the cookie matches the configured secret", async () => {
    process.env.DONATE_PRIVATE_ACCESS_TOKEN = "a".repeat(24);
    getCookieMock.mockReturnValue({ value: "a".repeat(24) });
    const { hasDonationAccess } = await import("./accessGate");
    expect(await hasDonationAccess()).toBe(true);
  });

  it("denies access when the cookie doesn't match", async () => {
    process.env.DONATE_PRIVATE_ACCESS_TOKEN = "a".repeat(24);
    getCookieMock.mockReturnValue({ value: "wrong-value-wrong-value" });
    const { hasDonationAccess } = await import("./accessGate");
    expect(await hasDonationAccess()).toBe(false);
  });
});
