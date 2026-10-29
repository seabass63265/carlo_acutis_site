// Cybersource REST API HTTP Signature authentication.
//
// Source: Cybersource REST API "Getting Started" guide, "HTTP Signature
// Authentication" chapter.
// https://developer.cybersource.com/library/documentation/dev_guides/REST_API/Getting_Started/html/REST_GS/ch_authentication.5.3.htm
//
// Required headers: host, date, (request-target) [pseudo-header, signed but
// not sent], digest [POST only], v-c-merchant-id, signature.
//
// Digest: Base64(SHA-256(body)), prefixed "SHA-256=".
// Signature: Base64(HMAC-SHA256(signingString, Base64Decode(sharedSecret))).
// Signing string: "name: value" lines for each header in `headers`, in
// order, joined with "\n" (no trailing newline).

import { createHash, createHmac } from "node:crypto";
import type { CybersourceCredentials } from "./env";

export interface SignedRequestHeaders {
  Host: string;
  Date: string;
  "v-c-merchant-id": string;
  Signature: string;
  Digest?: string;
  "Content-Type"?: string;
}

function gmtDate(): string {
  // RFC 7231 IMF-fixdate, e.g. "Tue, 28 Oct 2026 09:15:00 GMT".
  return new Date().toUTCString().replace(/GMT$/, "GMT");
}

function digestFor(body: string): string {
  const hash = createHash("sha256").update(body, "utf8").digest("base64");
  return `SHA-256=${hash}`;
}

export function buildSignedHeaders(params: {
  credentials: CybersourceCredentials;
  method: "GET" | "POST";
  path: string; // e.g. "/pts/v2/payments"
  body?: string; // required for POST
}): SignedRequestHeaders {
  const { credentials, method, path, body } = params;
  const date = gmtDate();
  const requestTarget = `${method.toLowerCase()} ${path}`;

  const signedHeaderNames: string[] = ["host", "date", "(request-target)"];
  const signingLines: string[] = [
    `host: ${credentials.host}`,
    `date: ${date}`,
    `(request-target): ${requestTarget}`,
  ];

  let digest: string | undefined;
  if (method === "POST") {
    if (body === undefined) {
      throw new Error("POST requests must provide a body to sign (use \"\" for an empty body).");
    }
    digest = digestFor(body);
    signedHeaderNames.push("digest");
    signingLines.push(`digest: ${digest}`);
  }

  signedHeaderNames.push("v-c-merchant-id");
  signingLines.push(`v-c-merchant-id: ${credentials.merchantId}`);

  const signingString = signingLines.join("\n");
  const key = Buffer.from(credentials.sharedSecret, "base64");
  const signature = createHmac("sha256", key).update(signingString, "utf8").digest("base64");

  const signatureHeader =
    `keyid="${credentials.keyId}", algorithm="HmacSHA256", ` +
    `headers="${signedHeaderNames.join(" ")}", signature="${signature}"`;

  const headers: SignedRequestHeaders = {
    Host: credentials.host,
    Date: date,
    "v-c-merchant-id": credentials.merchantId,
    Signature: signatureHeader,
  };
  if (digest) headers.Digest = digest;
  if (method === "POST") headers["Content-Type"] = "application/json;charset=utf-8";

  return headers;
}
