"use client";

import { useEffect, useRef, useState } from "react";
import { createMicroform } from "@/lib/payments/microform";

type FormStatus = "idle" | "loading-form" | "ready" | "submitting" | "succeeded" | "declined" | "pending" | "error";

interface MicroformLike {
  createField(type: "number" | "securityCode", options?: { placeholder?: string }): {
    load(selector: string): void;
  };
  createToken(
    options: { expirationMonth: string; expirationYear: string },
    callback: (err: Error | null, token: { toString(): string } | null) => void,
  ): void;
}

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "AU", label: "Australia" },
  { code: "MX", label: "Mexico" },
];

const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 12 }, (_, i) => String(CURRENT_YEAR + i));

function newIdempotencyKey(): string {
  return (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`)
    .replace(/-/g, "");
}

export default function DonationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [amount, setAmount] = useState("50");
  const [expMonth, setExpMonth] = useState(MONTHS[0]);
  const [expYear, setExpYear] = useState(YEARS[0]);

  const microformRef = useRef<MicroformLike | null>(null);
  const idempotencyKeyRef = useRef<string>(newIdempotencyKey());
  const numberFieldMounted = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setStatus("loading-form");
      setErrorMessage(null);
      try {
        const res = await fetch("/api/donate/capture-context", { method: "POST" });
        if (!res.ok) throw new Error("Could not start the donation form.");
        const { captureContext } = (await res.json()) as { captureContext: string };

        const microform = (await createMicroform(captureContext)) as unknown as MicroformLike;
        if (cancelled) return;
        microformRef.current = microform;

        if (!numberFieldMounted.current) {
          microform.createField("number", { placeholder: "Card number" }).load("#card-number-field");
          microform.createField("securityCode", { placeholder: "CVV" }).load("#card-cvv-field");
          numberFieldMounted.current = true;
        }

        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to initialize donation form:", err);
        setStatus("error");
        setErrorMessage("We couldn't load the secure payment form. Please refresh and try again.");
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!microformRef.current || status === "submitting") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const donor = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      address1: String(formData.get("address1") || ""),
      city: String(formData.get("city") || ""),
      state: String(formData.get("state") || ""),
      postalCode: String(formData.get("postalCode") || ""),
      country: String(formData.get("country") || "US"),
    };

    setStatus("submitting");
    setErrorMessage(null);

    microformRef.current.createToken({ expirationMonth: expMonth, expirationYear: expYear }, async (err, token) => {
      if (err || !token) {
        console.error("Tokenization failed:", err);
        setStatus("ready");
        setErrorMessage("We couldn't validate your card details. Please check them and try again.");
        return;
      }

      try {
        const res = await fetch("/api/donate/charge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idempotencyKey: idempotencyKeyRef.current,
            amount,
            donor,
            transientToken: token.toString(),
          }),
        });
        const data = (await res.json()) as {
          status: "succeeded" | "declined" | "pending" | "uncertain";
          reason?: string;
          error?: string;
        };

        if (data.status === "succeeded") {
          setStatus("succeeded");
          // A fresh donation (not a retry of this one) needs a new key.
          idempotencyKeyRef.current = newIdempotencyKey();
        } else if (data.status === "declined") {
          setStatus("declined");
          setErrorMessage(data.reason || "Your card was declined. Please try a different card.");
          idempotencyKeyRef.current = newIdempotencyKey();
        } else if (data.status === "pending" || data.status === "uncertain") {
          setStatus("pending");
          setErrorMessage(
            "We couldn't confirm your donation immediately. If you aren't contacted shortly, please reach out to us before trying again.",
          );
          // Deliberately keep the same idempotency key — do not let a
          // re-click fire a second charge attempt while this is unresolved.
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Something went wrong. Please try again.");
        }
      } catch (fetchErr) {
        console.error("Donation request failed:", fetchErr);
        setStatus("error");
        setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
      }
    });
  }

  if (status === "succeeded") {
    return (
      <div className="bg-white border border-cream-dark rounded-sm p-10 text-center" role="status">
        <p className="font-serif text-2xl text-navy mb-3">Thank you for your gift.</p>
        <p className="text-navy/60 text-sm">A receipt has been sent to your email address.</p>
      </div>
    );
  }

  const disabled = status === "submitting" || status === "loading-form";

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-cream-dark rounded-sm p-8" noValidate>
      <div aria-live="polite" className="sr-only">
        {status === "loading-form" && "Loading secure payment form"}
        {status === "submitting" && "Processing your donation"}
      </div>

      {errorMessage && (
        <div role="alert" className="mb-6 rounded-sm border border-red-200 bg-red-50 text-red-700 text-sm p-4">
          {errorMessage}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="amount" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">
          Donation amount (USD)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/50">$</span>
          <input
            id="amount"
            name="amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full pl-8 pr-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">
            First name
          </label>
          <input id="firstName" name="firstName" autoComplete="given-name" required
            className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">
            Last name
          </label>
          <input id="lastName" name="lastName" autoComplete="family-name" required
            className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required
          className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold" />
      </div>

      <div className="mb-4">
        <label htmlFor="address1" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">
          Billing address
        </label>
        <input id="address1" name="address1" autoComplete="address-line1" required
          className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="city" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">City</label>
          <input id="city" name="city" autoComplete="address-level2" required
            className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
        <div>
          <label htmlFor="state" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">State</label>
          <input id="state" name="state" autoComplete="address-level1" required
            className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">ZIP</label>
          <input id="postalCode" name="postalCode" autoComplete="postal-code" required
            className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="country" className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">Country</label>
        <select id="country" name="country" defaultValue="US"
          className="w-full px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold">
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <span className="block text-xs font-semibold tracking-wide uppercase text-navy/60 mb-2">Card details</span>
        <div
          id="card-number-field"
          className="w-full px-4 py-3 border border-cream-dark rounded-sm mb-3"
          style={{ height: 44 }}
        />
        <div className="grid grid-cols-3 gap-4">
          <div
            id="card-cvv-field"
            className="col-span-1 px-4 py-3 border border-cream-dark rounded-sm"
            style={{ height: 44 }}
          />
          <select value={expMonth} onChange={(e) => setExpMonth(e.target.value)} aria-label="Expiration month"
            className="col-span-1 px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold">
            {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={expYear} onChange={(e) => setExpYear(e.target.value)} aria-label="Expiration year"
            className="col-span-1 px-4 py-3 border border-cream-dark rounded-sm focus:outline-none focus:ring-2 focus:ring-gold">
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full mt-6 bg-gold text-navy-dark font-semibold py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Processing…" : status === "loading-form" ? "Loading…" : `Donate $${amount || "0"}`}
      </button>

      <p className="text-center text-navy/40 text-xs mt-4">
        Payments are processed securely by Bank of America Gateway. Your card details never pass through our servers.
      </p>
    </form>
  );
}
