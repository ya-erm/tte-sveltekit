import type { FillCalculation } from '../calculate';
import type { FillOperation } from './Operation';

export type Fill = FillOperation & FillCalculation;

export function getFillDate(fill: FillOperation) {
  return fill.trades[fill.trades.length - 1]?.date ?? fill.date;
}
