/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { V1PortfolioPosition } from '$lib/api';
import { type Currency, InstrumentType, type PortfolioPosition } from '$lib/model';
import { mapInstrumentType } from './mapInstrumentType';
import { mapMoneyValue } from './mapMoneyValue';

export function mapPortfolioPosition(dto: V1PortfolioPosition): PortfolioPosition {
  const {
    figi,
    instrumentType,
    quantity,
    quantityLots,
    averagePositionPrice,
    currentPrice,
    expectedYield,
  } = dto;

  const position = {
    figi: figi!,
    instrumentType: mapInstrumentType(instrumentType),
    currency: (currentPrice?.currency || averagePositionPrice?.currency) as Currency,
    averagePositionPrice: mapMoneyValue(averagePositionPrice) ?? 0,
    expectedYield: mapMoneyValue(expectedYield) ?? 0,
    currentPrice: mapMoneyValue(currentPrice) ?? 0,
    lots: mapMoneyValue(quantityLots) ?? 0,
    quantity: mapMoneyValue(quantity) ?? 0,
  };

  if (position.instrumentType === InstrumentType.Futures) {
    position.currentPrice =
      position.averagePositionPrice + position.expectedYield / position.quantity;
  }

  return position;
}
