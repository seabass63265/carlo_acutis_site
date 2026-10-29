import { describe, expect, it } from "vitest";
import { parseDonationAmountToCents, InvalidAmountError, centsToDecimalString } from "./money";

describe("parseDonationAmountToCents", () => {
  it("parses whole dollars", () => {
    expect(parseDonationAmountToCents("25")).toBe(2500);
  });

  it("parses cents precisely without float drift", () => {
    expect(parseDonationAmountToCents("19.99")).toBe(1999);
    expect(parseDonationAmountToCents("10.10")).toBe(1010);
  });

  it("rejects amounts below the minimum", () => {
    expect(() => parseDonationAmountToCents("0.50")).toThrow(InvalidAmountError);
  });

  it("rejects amounts above the maximum", () => {
    expect(() => parseDonationAmountToCents("1000000")).toThrow(InvalidAmountError);
  });

  it("rejects non-numeric input", () => {
    expect(() => parseDonationAmountToCents("abc")).toThrow(InvalidAmountError);
    expect(() => parseDonationAmountToCents("25; DROP TABLE donations")).toThrow(InvalidAmountError);
  });

  it("rejects more than two decimal places", () => {
    expect(() => parseDonationAmountToCents("25.999")).toThrow(InvalidAmountError);
  });

  it("rejects negative amounts and scientific notation", () => {
    expect(() => parseDonationAmountToCents("-25")).toThrow(InvalidAmountError);
    expect(() => parseDonationAmountToCents("2.5e10")).toThrow(InvalidAmountError);
  });

  it("rejects non-string input", () => {
    expect(() => parseDonationAmountToCents(25)).toThrow(InvalidAmountError);
    expect(() => parseDonationAmountToCents(null)).toThrow(InvalidAmountError);
  });
});

describe("centsToDecimalString", () => {
  it("formats cents back to a two-decimal string", () => {
    expect(centsToDecimalString(2500)).toBe("25.00");
    expect(centsToDecimalString(1999)).toBe("19.99");
  });
});
