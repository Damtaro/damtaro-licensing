import currencies from "../data/currencies";

export function getDisplayCurrency(selectedCurrency) {
  return currencies.find((currency) => currency.code === selectedCurrency?.code) || currencies[0];
}

// Fixed nominal display only: never convert or use this string in an order.
export function formatLicensePrice(amount, selectedCurrency) {
  return `${getDisplayCurrency(selectedCurrency).symbol}${amount}`;
}
