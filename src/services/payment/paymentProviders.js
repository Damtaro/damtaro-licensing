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
  // Stable track IDs from src/data/tracks.js.
  1: { // BLIND
    creator: "https://damtarooff.gumroad.com/l/cxmwf?option=iVqgskMFFEY4umbdgkWd7w%3D%3D",
    business: "https://damtarooff.gumroad.com/l/mzitdy?option=9JAK-Dqy7T5U73vL6fk__Q%3D%3D",
  },
  2: { // CONTROL
    creator: "https://damtarooff.gumroad.com/l/cxmwf?option=SFQ_c_3qx6x4rRQgMhpW4w%3D%3D",
    business: "https://damtarooff.gumroad.com/l/mzitdy?option=Gk-u85_dZN5jsmrMKxbYug%3D%3D",
  },
  3: { // ELEVATION
    creator: "https://damtarooff.gumroad.com/l/cxmwf?option=SplyuJZ7f-tRFBNHUCNcog%3D%3D",
    business: "https://damtarooff.gumroad.com/l/mzitdy?option=Z51sAJIV0rUJ9oAWQw_J6g%3D%3D",
  },
  4: { // FEEL AGAIN
    creator: "https://damtarooff.gumroad.com/l/cxmwf?option=ZxoUcnKMaY-oGqsUihgNAw%3D%3D",
    business: "https://damtarooff.gumroad.com/l/mzitdy?option=NhmSOlNPBPEeQkxFBSK03w%3D%3D",
  },
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
    const trackId = items[0]?.trackId;
    if (
      !Object.hasOwn(gumroadCheckouts, trackId) ||
      !Object.hasOwn(gumroadCheckouts[trackId], licenseType)
    ) {
      throw new Error("Gumroad checkout is not configured for this track and license type.");
    }
    if (paymentRequest.currency !== "USD") {
      throw new Error("Gumroad license checkout requires USD.");
    }
    return {
      ...paymentRequest,
      provider: "gumroad",
      checkoutUrl: `${gumroadCheckouts[trackId][licenseType]}&wanted=true`,
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
