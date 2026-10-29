import { describe, expect, it } from "vitest";
import { createHmac } from "node:crypto";
import { buildSignedHeaders } from "./httpSignature";
import type { CybersourceCredentials } from "./env";

const credentials: CybersourceCredentials = {
  environment: "test",
  host: "apitest.cybersource.com",
  merchantId: "test_merchant",
  keyId: "test-key-id",
  sharedSecret: Buffer.from("super-secret-key-bytes").toString("base64"),
};

describe("buildSignedHeaders", () => {
  it("includes a digest and signs it for POST requests", () => {
    const body = JSON.stringify({ hello: "world" });
    const headers = buildSignedHeaders({ credentials, method: "POST", path: "/pts/v2/payments", body });

    expect(headers.Digest).toMatch(/^SHA-256=/);
    expect(headers.Signature).toContain('headers="host date (request-target) digest v-c-merchant-id"');
    expect(headers.Signature).toContain('algorithm="HmacSHA256"');
    expect(headers.Signature).toContain(`keyid="${credentials.keyId}"`);
    expect(headers["v-c-merchant-id"]).toBe(credentials.merchantId);
  });

  it("omits the digest for GET requests", () => {
    const headers = buildSignedHeaders({ credentials, method: "GET", path: "/pts/v2/payments/abc" });

    expect(headers.Digest).toBeUndefined();
    expect(headers.Signature).toContain('headers="host date (request-target) v-c-merchant-id"');
  });

  it("produces a signature that matches manual recomputation", () => {
    const body = JSON.stringify({ a: 1 });
    const headers = buildSignedHeaders({ credentials, method: "POST", path: "/pts/v2/payments", body });

    const signingString = [
      `host: ${credentials.host}`,
      `date: ${headers.Date}`,
      `(request-target): post /pts/v2/payments`,
      `digest: ${headers.Digest}`,
      `v-c-merchant-id: ${credentials.merchantId}`,
    ].join("\n");

    const expectedSignature = createHmac("sha256", Buffer.from(credentials.sharedSecret, "base64"))
      .update(signingString, "utf8")
      .digest("base64");

    expect(headers.Signature).toContain(`signature="${expectedSignature}"`);
  });

  it("throws if a POST body is omitted", () => {
    expect(() =>
      buildSignedHeaders({ credentials, method: "POST", path: "/pts/v2/payments" }),
    ).toThrow();
  });
});
