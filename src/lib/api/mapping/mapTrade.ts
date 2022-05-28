/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { V1OperationTrade } from '$lib/api';
import type { Trade } from '$lib/model';
import { mapMoneyValue } from './mapMoneyValue';

export function mapTrade(dto: V1OperationTrade): Trade {
  const { tradeId, dateTime, price, quantity } = dto;
  return {
    id: tradeId!,
    date: dateTime!,
    price: mapMoneyValue(price) ?? 0,
    quantity: parseInt(quantity ?? '0'),
  };
}
