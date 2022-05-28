import type { Currency } from './Currency';
import type { InstrumentType } from './InstrumentType';

export type Position = {
  figi: string;
  name: string;
  ticker: string;
  instrumentType: InstrumentType;
  currency: Currency;
  quantity: number;
  fixedPnL: number;
  average: number | null;
  currentPrice?: number;
  expectedYield?: number;
};

export type PortfolioPosition = {
  figi: string;
  instrumentType: InstrumentType;
  quantity: number;
  lots: number;
  currency: Currency;
  averagePositionPrice: number;
  currentPrice: number;
  expectedYield: number;
};
