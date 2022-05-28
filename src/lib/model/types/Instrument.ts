import type { Currency } from './Currency';
import type { InstrumentType } from './InstrumentType';

export type Instrument = {
  /** Тип инструмента */
  instrumentType: InstrumentType;
  /** Идентификатор инструмента FIGI */
  figi: string;
  /** Краткий идентификатор инструмента */
  ticker: string;
  /** Полное наименование инструмента */
  name: string;
  /** Размер лота */
  lotSize: number;
  /** Валюта */
  currency: Currency;
  /** Наименование биржи */
  exchangeName?: string;
  /** Шаг цены */
  minPriceIncrement: number;
};
