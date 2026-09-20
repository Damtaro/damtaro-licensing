export function createPaymentProvider({
  name,
  createPayment,
  getPaymentStatus,
  verifyPayment,
}) {
  if (!name) {
    throw new Error("A payment provider name is required.");
  }

  return {
    name,
    createPayment,
    getPaymentStatus,
    verifyPayment,
  };
}
