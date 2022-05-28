/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { V1Operation } from '$lib/api';
import type { BaseOperation, Currency, Operation } from '$lib/model';
import { mapInstrumentType } from './mapInstrumentType';
import { mapMoneyValue } from './mapMoneyValue';
import { mapOperationType } from './mapOperationType';
import { mapTrade } from './mapTrade';

export function mapOperation(dto: V1Operation): Operation {
  const {
    id,
    figi,
    date,
    price,
    currency,
    instrumentType,
    operationType,
    payment,
    quantity,
    quantityRest,
    trades,
  } = dto;

  const operation: BaseOperation = {
    id: id!,
    date: date!,
    currency: (currency ?? payment?.currency) as Currency,
    payment: mapMoneyValue(payment) ?? 0,
    operationType: mapOperationType(operationType),
  };

  return figi
    ? {
        figi,
        ...operation,
        price: mapMoneyValue(price) ?? 0,
        quantityRequested: parseInt(quantity ?? '0'),
        quantityExecuted: parseInt(quantity ?? '0') - parseInt(quantityRest ?? '0'),
        instrumentType: mapInstrumentType(instrumentType),
        trades: trades?.map(mapTrade),
      }
    : operation;
}
