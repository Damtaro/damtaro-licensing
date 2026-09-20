import ORDER_STATUS from "../data/orderStatuses";

const CREATOR_LICENSE_PRICE = 15;

function createOrderId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase();

  return `DM-${timestamp}-${random}`;
}

function getLicensePrice(license) {
  if (license?.type === "creator") {
    return CREATOR_LICENSE_PRICE;
  }

  return null;
}

function normalizeCustomer(customer = {}) {
  return {
    firstName: customer.firstName?.trim() || "",
    lastName: customer.lastName?.trim() || "",
    email: customer.email?.trim().toLowerCase() || "",
  };
}

function normalizeItem(item) {
  const license = item?.license;
  const track = item?.track;

  const price = getLicensePrice(license);

  return {
    id: item.id,
    trackId: track?.id ?? null,
    trackTitle: track?.title ?? null,
    licenseId: license?.id ?? null,
    licenseTitle: license?.title ?? "",
    licenseType: license?.type ?? "",
    price,
    pricingType:
      price === null ? "custom" : "fixed",
  };
}

export function createOrder({
  items = [],
  customer = {},
  currency = "USD",
}) {
  const normalizedItems = items.map(normalizeItem);

  const hasCustomPricing = normalizedItems.some(
    (item) => item.pricingType === "custom"
  );

  const subtotal = normalizedItems.reduce(
    (total, item) =>
      total + (item.price ?? 0),
    0
  );

  return {
    orderId: createOrderId(),

    customer: normalizeCustomer(customer),

    items: normalizedItems,

    subtotal,

    currency,

    paymentProvider: null,

    paymentId: null,

    status: ORDER_STATUS.PENDING,

    hasCustomPricing,

    licenseIssued: false,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };
}

export function markOrderPaymentProcessing(
  order
) {
  return {
    ...order,
    status: ORDER_STATUS.PAYMENT_PROCESSING,
    updatedAt: new Date().toISOString(),
  };
}

export function markOrderPaid({
  order,
  paymentId,
  paymentProvider,
}) {
  if (!paymentId) {
    throw new Error(
      "A verified payment ID is required."
    );
  }

  return {
    ...order,
    paymentProvider,
    paymentId,
    status: ORDER_STATUS.PAID,
    updatedAt: new Date().toISOString(),
  };
}

export function markLicenseIssued(order) {
  if (order.status !== ORDER_STATUS.PAID) {
    throw new Error(
      "A license cannot be issued before payment is confirmed."
    );
  }

  if (order.licenseIssued) {
    return order;
  }

  return {
    ...order,
    status: ORDER_STATUS.LICENSE_ISSUED,
    licenseIssued: true,
    updatedAt: new Date().toISOString(),
  };
}

export function markOrderFailed(order) {
  return {
    ...order,
    status: ORDER_STATUS.FAILED,
    updatedAt: new Date().toISOString(),
  };
}

export function markOrderCancelled(order) {
  return {
    ...order,
    status: ORDER_STATUS.CANCELLED,
    updatedAt: new Date().toISOString(),
  };
}

export function markOrderRefunded(order) {
  return {
    ...order,
    status: ORDER_STATUS.REFUNDED,
    updatedAt: new Date().toISOString(),
  };
}
