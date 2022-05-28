import type { FillCalculation } from '../calculate';
import type { FillOperation } from './Operation';

export type Fill = FillOperation & FillCalculation;
