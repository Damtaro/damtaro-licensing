export const PAYMENT_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  PAID: "paid",
  FAILED: "failed",
  CANCELLED: "cancelled",
};

export function createPaymentRequest({
  orderId,
  amount,
  currency = "USD",
}) {
  if (!orderId) {
    throw new Error(
      "An order ID is required to create a payment."
    );
  }

  if (
    typeof amount !== "number" ||
    amount < 0
  ) {
    throw new Error(
      "A valid payment amount is required."
    );
  }

  if (!currency) {
    throw new Error(
      "A payment currency is required."
    );
  }

  return {
    orderId,
    amount,
    currency,
    status: PAYMENT_STATUS.PENDING,
    provider: null,
    providerPaymentId: null,
    createdAt:
      new Date().toISOString(),
  };
}

export function markPaymentProcessing(
  payment
) {
  return {
    ...payment,
    status:
      PAYMENT_STATUS.PROCESSING,
  };
}

export function markPaymentPaid({
  payment,
  provider,
  providerPaymentId,
}) {
  if (!providerPaymentId) {
    throw new Error(
      "A verified provider payment ID is required."
    );
  }

  return {
    ...payment,
    provider,
    providerPaymentId,
    status:
      PAYMENT_STATUS.PAID,
    confirmedAt:
      new Date().toISOString(),
  };
}

export function markPaymentFailed(
  payment
) {
  return {
    ...payment,
    status:
      PAYMENT_STATUS.FAILED,
  };
}

export function markPaymentCancelled(
  payment
) {
  return {
    ...payment,
    status:
      PAYMENT_STATUS.CANCELLED,
  };
}
