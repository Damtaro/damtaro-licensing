import { createPaymentProvider } from "./paymentProvider";

const payphoneProvider = createPaymentProvider({
  name: "payphone",

  createPayment() {
    throw new Error(
      "Payphone payment integration is not configured yet."
    );
  },

  getPaymentStatus() {
    throw new Error(
      "Payphone payment status is not configured yet."
    );
  },

  verifyPayment() {
    throw new Error(
      "Payphone payment verification is not configured yet."
    );
  },
});

const gumroadProvider = createPaymentProvider({
  name: "gumroad",

  createPayment(paymentRequest) {
    return {
      ...paymentRequest,
      provider: "gumroad",
      checkoutUrl:
        "https://damtarooff.gumroad.com/l/cxmwf?wanted=true",
    };
  },

  getPaymentStatus() {
    throw new Error(
      "Gumroad payment status verification is not configured yet."
    );
  },

  verifyPayment() {
    throw new Error(
      "Gumroad payment verification is not configured yet."
    );
  },
});

const paymentProviders = {
  payphone: payphoneProvider,
  gumroad: gumroadProvider,
};

export function getPaymentProvider(
  providerName = "gumroad"
) {
  const provider =
    paymentProviders[providerName];

  if (!provider) {
    throw new Error(
      `Payment provider "${providerName}" is not configured.`
    );
  }

  return provider;
}

export function getAvailablePaymentProviders() {
  return Object.keys(paymentProviders);
}

export default paymentProviders;
