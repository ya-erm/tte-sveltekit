import { Currency } from '$lib/model';

export function formatCurrency(currency: Currency | string | null | undefined) {
  if (!currency) {
    return '';
  }
  switch (currency) {
    case Currency.RUB:
      return '₽';
    case Currency.USD:
      return '$';
    case Currency.EUR:
      return '€';
    default:
      return currency;
  }
}

export function formatMoney(
  value: number | null | undefined,
  currency: Currency | string | null | undefined = undefined,
  withSign = false,
) {
  if (value == null || value == undefined || isNaN(value)) {
    return '';
  }
  const nbsp = ' ';
  const sign = withSign && value > 0 ? '+' : '';
  let result = `${sign}${value?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, nbsp)}`;
  if (currency) {
    result += `${nbsp}${formatCurrency(currency)}`;
  }
  return result;
}
