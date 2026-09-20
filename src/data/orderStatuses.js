export const ORDER_STATUS = {
  PENDING: "pending",
  PAYMENT_PROCESSING: "payment_processing",
  PAID: "paid",
  LICENSE_ISSUED: "license_issued",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",

  [ORDER_STATUS.PAYMENT_PROCESSING]:
    "Payment Processing",

  [ORDER_STATUS.PAID]: "Paid",

  [ORDER_STATUS.LICENSE_ISSUED]:
    "License Issued",

  [ORDER_STATUS.FAILED]: "Failed",

  [ORDER_STATUS.CANCELLED]: "Cancelled",

  [ORDER_STATUS.REFUNDED]: "Refunded",
};

export default ORDER_STATUS;
