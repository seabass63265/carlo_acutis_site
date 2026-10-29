// Precise monetary handling: donation amounts are collected from the donor
// as a decimal dollar string and converted to integer cents immediately, so
// no float arithmetic ever touches a money value.

export const DONATION_CURRENCY = "USD";
export const MIN_DONATION_CENTS = 100; // $1.00
export const MAX_DONATION_CENTS = 5_000_000; // $50,000.00

export class InvalidAmountError extends Error {}

// Accepts "25", "25.00", "25.5" etc. Rejects anything with more than two
// decimal places, scientific notation, signs, or non-numeric input — all of
// which `Number()` would otherwise silently accept or mis-parse.
const AMOUNT_PATTERN = /^\d{1,9}(\.\d{1,2})?$/;

export function parseDonationAmountToCents(rawAmount: unknown): number {
  if (typeof rawAmount !== "string") {
    throw new InvalidAmountError("Donation amount must be a string.");
  }
  const trimmed = rawAmount.trim();
  if (!AMOUNT_PATTERN.test(trimmed)) {
    throw new InvalidAmountError("Donation amount is not a valid decimal dollar amount.");
  }

  const [dollars, cents = ""] = trimmed.split(".");
  const paddedCents = (cents + "00").slice(0, 2);
  const totalCents = Number(dollars) * 100 + Number(paddedCents);

  if (!Number.isSafeInteger(totalCents)) {
    throw new InvalidAmountError("Donation amount is out of range.");
  }
  if (totalCents < MIN_DONATION_CENTS || totalCents > MAX_DONATION_CENTS) {
    throw new InvalidAmountError(
      `Donation amount must be between ${(MIN_DONATION_CENTS / 100).toFixed(2)} and ${(
        MAX_DONATION_CENTS / 100
      ).toFixed(2)} ${DONATION_CURRENCY}.`,
    );
  }

  return totalCents;
}

export function centsToDecimalString(cents: number): string {
  return (cents / 100).toFixed(2);
}
