import { describe, expect, it, vi, beforeEach } from "vitest";

const postMock = vi.fn();

vi.mock("./client", () => ({
  cybersourceClient: { post: postMock },
  CybersourceApiError: class CybersourceApiError extends Error {
    constructor(message: string, readonly httpStatus: number, readonly body: unknown) {
      super(message);
    }
  },
}));

const donor = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  address1: "123 Main St",
  city: "Springfield",
  state: "IL",
  postalCode: "62704",
  country: "US",
};

describe("chargeDonation status mapping", () => {
  beforeEach(() => {
    postMock.mockReset();
  });

  it("maps AUTHORIZED to succeeded", async () => {
    postMock.mockResolvedValue({ id: "txn_1", status: "AUTHORIZED" });
    const { chargeDonation } = await import("./payment");
    const result = await chargeDonation({ idempotencyKey: "key1", amountCents: 2500, transientToken: "tok", donor });
    expect(result.kind).toBe("succeeded");
    expect(result.providerTransactionId).toBe("txn_1");
  });

  it("maps DECLINED to declined", async () => {
    postMock.mockResolvedValue({ id: "txn_2", status: "DECLINED", errorInformation: { reason: "INSUFFICIENT_FUND" } });
    const { chargeDonation } = await import("./payment");
    const result = await chargeDonation({ idempotencyKey: "key2", amountCents: 2500, transientToken: "tok", donor });
    expect(result.kind).toBe("declined");
    expect(result.reason).toBe("INSUFFICIENT_FUND");
  });

  it("maps PENDING_REVIEW to pending, not success", async () => {
    postMock.mockResolvedValue({ id: "txn_3", status: "PENDING_REVIEW" });
    const { chargeDonation } = await import("./payment");
    const result = await chargeDonation({ idempotencyKey: "key3", amountCents: 2500, transientToken: "tok", donor });
    expect(result.kind).toBe("pending");
  });

  it("maps an unrecognized/unknown status to uncertain rather than guessing success", async () => {
    postMock.mockResolvedValue({ id: "txn_4", status: "SOME_FUTURE_STATUS" });
    const { chargeDonation } = await import("./payment");
    const result = await chargeDonation({ idempotencyKey: "key4", amountCents: 2500, transientToken: "tok", donor });
    expect(result.kind).toBe("uncertain");
  });

  it("sends the amount as a precise decimal string, not a float", async () => {
    postMock.mockResolvedValue({ id: "txn_5", status: "AUTHORIZED" });
    const { chargeDonation } = await import("./payment");
    await chargeDonation({ idempotencyKey: "key5", amountCents: 1999, transientToken: "tok", donor });
    const [, body] = postMock.mock.calls[0] as [string, { orderInformation: { amountDetails: { totalAmount: string } } }];
    expect(body.orderInformation.amountDetails.totalAmount).toBe("19.99");
  });
});
