import type { V1MoneyValue } from '$lib/api';
import type { V1Quotation } from '../generated';

/**
 * Преобразование к числовому значению
 * @param  quotation
 */
export function mapMoneyValue(quotation: V1MoneyValue | V1Quotation | undefined | null) {
  if (!quotation) return null;
  const units = quotation.units?.startsWith('-') ? quotation.units.substring(1) : quotation.units;
  const nano = Math.abs(quotation?.nano || 0);
  const negative = quotation.units?.startsWith('-') || (quotation.nano || 0) < 0;
  const result = (negative ? -1 : 1) * Number(`${units}.${nano}`);
  return result;
}
