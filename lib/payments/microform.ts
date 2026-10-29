// Client-side loader for Cybersource Flex Microform v2.
//
// The capture context is a signed JWT whose payload names the exact
// Microform script URL (and its Subresource Integrity hash) to load for
// that session — Cybersource's integration guide documents decoding the
// JWT to read these before injecting the <script> tag, rather than
// hardcoding a script URL, since it can rotate.
//
// NOTE — verify before go-live: we could not pull a verbatim field-by-field
// JWT payload schema or Microform JS method signatures from a single
// authoritative Cybersource page during this implementation (their docs
// site is heavily JS-rendered and blocked static fetching). The shape used
// below (ctx[].data.clientLibrary / clientLibraryIntegrity, and the
// Flex/microform/createField/createToken call pattern) matches Cybersource's
// published Microform v2 integration guides and sample apps, but confirm it
// against the "API Reference v2" and "Using the Transient Token (v2)" pages
// linked from https://developer.cybersource.com/docs/cybs/en-us/digital-accept-flex/developer/all/rest/digital-accept/microform-integ-v2.html
// for your account before processing real cards.

export interface MicroformToken {
  toString(): string;
}

interface MicroformField {
  load(selector: string): void;
  on(event: "change" | "focus" | "blur", handler: (data: unknown) => void): void;
}

interface Microform {
  createField(type: "number" | "securityCode", options?: { placeholder?: string }): MicroformField;
  createToken(
    options: { expirationMonth: string; expirationYear: string },
    callback: (err: Error | null, token: MicroformToken | null) => void,
  ): void;
}

interface FlexInstance {
  microform(options?: { styles?: Record<string, unknown> }): Microform;
}

declare global {
  interface Window {
    Flex?: new (captureContext: string) => FlexInstance;
  }
}

function decodeJwtPayload(jwt: string): Record<string, unknown> {
  const parts = jwt.split(".");
  if (parts.length !== 3) throw new Error("Capture context is not a valid JWT.");
  const payloadB64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const json = atob(payloadB64.padEnd(payloadB64.length + ((4 - (payloadB64.length % 4)) % 4), "="));
  return JSON.parse(json);
}

function extractClientLibrary(payload: Record<string, unknown>): { src: string; integrity: string } {
  const ctx = payload.ctx as Array<{ data?: { clientLibrary?: string; clientLibraryIntegrity?: string } }> | undefined;
  const data = ctx?.[0]?.data;
  if (!data?.clientLibrary || !data?.clientLibraryIntegrity) {
    throw new Error("Capture context did not include a Microform client library URL.");
  }
  return { src: data.clientLibrary, integrity: data.clientLibraryIntegrity };
}

let loadPromise: Promise<void> | null = null;

function loadScriptOnce(src: string, integrity: string): Promise<void> {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.integrity = integrity;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load the secure payment form library."));
    document.head.appendChild(script);
  });
  return loadPromise;
}

export async function createMicroform(captureContext: string): Promise<Microform> {
  const payload = decodeJwtPayload(captureContext);
  const { src, integrity } = extractClientLibrary(payload);
  await loadScriptOnce(src, integrity);

  if (!window.Flex) {
    throw new Error("Secure payment form library did not initialize.");
  }
  const flex = new window.Flex(captureContext);
  return flex.microform({
    styles: {
      input: { "font-size": "15px", "font-family": "var(--font-sans, sans-serif)", color: "#0F1E3C" },
      "::placeholder": { color: "#0F1E3C66" },
    },
  });
}
