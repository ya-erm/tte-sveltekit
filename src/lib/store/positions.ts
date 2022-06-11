import { getFillDate, InstrumentType, type Position } from '$lib/model';
import { derived } from 'svelte/store';
import { fills } from './fills';
import { instruments } from './instruments';
import { portfolio } from './portfolio';

export const positions = derived(
  [fills, portfolio, instruments],
  ([fills, portfolio, instruments]) => {
    if (!fills) return [];

    return Object.entries(fills).map(([figi, fills]) => {
      const instrument = instruments?.find((x) => x.figi === figi);
      const portfolioPosition = portfolio?.find((x) => x.figi === figi);
      const position: Position = {
        figi,
        ticker: instrument?.ticker ?? figi,
        name: instrument?.name ?? figi,
        currency: fills[0]?.currency ?? 'rub',
        quantity: fills[fills.length - 1]?.currentQuantity ?? 0,
        average: fills[fills.length - 1]?.averagePrice ?? null,
        instrumentType: fills[0]?.instrumentType || InstrumentType.Unknown,
        fixedPnL: fills.reduce((sum, item) => sum + (item.fixedPnL ?? 0), 0),
        currentPrice: portfolioPosition?.currentPrice,
        expectedYield: portfolioPosition?.expectedYield,
        fillsCount: fills.filter((x) => x.quantityExecuted > 0).length,
        lastFillDate: fills[fills.length - 1] ? getFillDate(fills[fills.length - 1]) : undefined,
      };
      return position;
    });
  },
);
