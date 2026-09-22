import {
  createPaymentRequest,
} from "./paymentService";
import { getPaymentProvider } from "./paymentProviders";

export function preparePayment({
  order,
}) {
  if (!order) {
    throw new Error(
      "An order is required to prepare a payment."
    );
  }

  if (!order.orderId) {
    throw new Error(
      "The order must have an order ID."
    );
  }

  if (
    order.status !== "pending"
  ) {
    throw new Error(
      "Only pending orders can start a payment."
    );
  }

  if (order.hasCustomPricing) {
    throw new Error(
      "Custom pricing orders require validation before payment."
    );
  }

  return createPaymentRequest({
    orderId: order.orderId,
    amount: order.subtotal,
    currency: order.currency,
  });
}

export function startPayment({
  order,
  providerName = "gumroad",
}) {
  const paymentRequest = preparePayment({ order });
  const provider = getPaymentProvider(providerName);

  return provider.createPayment({
    ...paymentRequest,
    items: order.items,
  });
}
