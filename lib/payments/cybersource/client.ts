import { randomUUID } from "node:crypto";
import { getCybersourceCredentials } from "./env";
import { buildSignedHeaders } from "./httpSignature";

export class CybersourceApiError extends Error {
  readonly httpStatus: number;
  readonly body: unknown;

  constructor(message: string, httpStatus: number, body: unknown) {
    super(message);
    this.name = "CybersourceApiError";
    this.httpStatus = httpStatus;
    this.body = body;
  }
}

// Network/timeout failures where we genuinely don't know whether
// Cybersource received and/or processed the request. Callers MUST treat
// this as "uncertain", never as "failed" — see payment.ts.
export class CybersourceUncertainError extends Error {
  constructor(message: string, readonly cause: unknown) {
    super(message);
    this.name = "CybersourceUncertainError";
  }
}

const REQUEST_TIMEOUT_MS = 20_000;

async function request(
  method: "GET" | "POST",
  path: string,
  body: unknown,
  responseFormat: "json" | "text",
): Promise<unknown> {
  const credentials = getCybersourceCredentials();
  const serializedBody = method === "POST" ? JSON.stringify(body ?? {}) : undefined;

  const signed = buildSignedHeaders({
    credentials,
    method,
    path,
    body: serializedBody,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`https://${credentials.host}${path}`, {
      method,
      headers: {
        ...signed,
        Accept: "application/json;charset=utf-8",
        "v-c-correlation-id": randomUUID(),
      },
      body: serializedBody,
      signal: controller.signal,
    });
  } catch (err) {
    // Covers network errors and our own timeout abort — the request's fate
    // at Cybersource is unknown. Do not translate this into a declined/failed
    // payment, and do not auto-retry from here.
    throw new CybersourceUncertainError(
      `Request to Cybersource ${path} did not complete (network error or timeout).`,
      err,
    );
  } finally {
    clearTimeout(timeout);
  }

  const text = await response.text();
  const parsedForErrors = (() => {
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { raw: text };
    }
  })();

  // 5xx from Cybersource itself is also an "uncertain" outcome for payment
  // submission: the gateway may have processed the authorization before
  // failing to respond cleanly.
  if (response.status >= 500) {
    throw new CybersourceUncertainError(
      `Cybersource ${path} returned HTTP ${response.status}.`,
      parsedForErrors,
    );
  }

  if (response.status >= 400) {
    throw new CybersourceApiError(
      `Cybersource ${path} returned HTTP ${response.status}.`,
      response.status,
      parsedForErrors,
    );
  }

  if (responseFormat === "text") return text;
  return text ? JSON.parse(text) : {};
}

export const cybersourceClient = {
  post: <T>(path: string, body: unknown) => request("POST", path, body, "json") as Promise<T>,
  get: <T>(path: string) => request("GET", path, undefined, "json") as Promise<T>,
  postText: (path: string, body: unknown) =>
    request("POST", path, body, "text") as Promise<string>,
};
