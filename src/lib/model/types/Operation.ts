import type { Currency } from './Currency';
import type { InstrumentType } from './InstrumentType';
import type { OperationType } from './OperationType';
import type { Trade } from './Trade';

export type Operation = BaseOperation | FillOperation;

export type BaseOperation = {
  /** Идентификатор заявки */
  id: string;
  /** Сумма платежа, с учётом знака */
  payment: number;
  /** Валюта */
  currency: Currency;
  /** Дата и время создания заявки в ISO8601, например "2021-02-10T11:18:27.276+03:00" */
  date: string;
  /** Тип операции */
  operationType: OperationType;
};

export type FillOperation = BaseOperation & {
  /** Идентификатор инструмента */
  figi: string;
  /** Тип инструмента */
  instrumentType: InstrumentType;
  /** Стоимость одного лота */
  price: number;
  /** Количество лотов в заявке */
  quantityRequested: number;
  /** Количество исполненных лотов */
  quantityExecuted: number;
  /** Список сделок */
  trades: Trade[];
  /** Комиссия */
  fee?: number;
};

export function isFillOperation(operation: Record<string, unknown>): operation is FillOperation {
  return 'figi' in operation;
}
