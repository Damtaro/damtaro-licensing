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

const gumroadCheckouts = {
  creator: "https://damtarooff.gumroad.com/l/cxmwf?wanted=true",
  business: "https://damtarooff.gumroad.com/l/huwklw?wanted=true",
};

const gumroadProvider = createPaymentProvider({
  name: "gumroad",

  createPayment(paymentRequest) {
    // These product links purchase one license; never redirect a whole cart
    // to a single product or default an unknown type to Creator.
    const items = paymentRequest.items;
    if (!Array.isArray(items) || items.length !== 1) {
      throw new Error("Gumroad direct checkout requires exactly one license item.");
    }
    const licenseType = items[0]?.licenseType;
    if (!Object.hasOwn(gumroadCheckouts, licenseType)) {
      throw new Error("Unsupported license type for Gumroad checkout.");
    }
    if (paymentRequest.currency !== "USD") {
      throw new Error("Gumroad license checkout requires USD.");
    }
    return {
      ...paymentRequest,
      provider: "gumroad",
      checkoutUrl: gumroadCheckouts[licenseType],
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
