/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { V1Share } from '$lib/api';
import type { Currency, Instrument, InstrumentType } from '$lib/model';
import type { V1Bond, V1Etf } from '../generated';
import { mapMoneyValue } from './mapMoneyValue';

export function mapInstrument(
  instrumentType: InstrumentType,
  instrument: V1Share | V1Bond | V1Etf | V1Bond,
): Instrument {
  const { figi, ticker, name, lot, currency, exchange, minPriceIncrement } = instrument;
  return {
    figi: figi!,
    name: name!,
    ticker: ticker!,
    instrumentType,
    currency: currency as Currency,
    lotSize: lot ?? 1,
    exchangeName: exchange,
    minPriceIncrement: mapMoneyValue(minPriceIncrement) ?? 0,
  };
}
