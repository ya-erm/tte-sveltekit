import { isFillOperation, OperationType, type Fill, type Operation } from '$lib/model';
import { calculateFills } from '$lib/model/calculate';
import type { SortDirection } from '$lib/utils/sorting';
import type { Messages } from '$lib/translate';
import { derived } from 'svelte/store';
import { operations } from './operations';
import { storable } from './storable';

export const fills = derived(operations, (operations) => {
  if (!operations) return {};

  const operationsByFigi = operations.reduce((acc, item) => {
    if (isFillOperation(item)) {
      const { figi } = item;
      (acc[figi] = acc[figi] || []).push(item);
    }
    return acc;
  }, {} as Record<string, Operation[]>);

  const fillsByFigi: Record<string, Fill[]> = {};

  Object.entries(operationsByFigi).forEach(([figi, operations]) => {
    const filteredOperations = operations
      .filter(isFillOperation)
      .filter(
        ({ operationType: type }) => type === OperationType.Buy || type == OperationType.Sell,
      );

    const calculations = calculateFills(
      filteredOperations.map(({ quantityExecuted: quantity, price, payment, fee }) => ({
        quantity,
        price,
        payment,
        fee,
      })),
    );

    fillsByFigi[figi] = filteredOperations.map((operation, i) => ({
      ...operation,
      ...calculations[i],
    }));
  });

  return fillsByFigi;
});

export const fillsGroupByType = storable(true, 'fills_group_by_type');

export type FillsSortBy = 'date' | 'PnL' | 'quantity';

export const fillsSortBy = storable<FillsSortBy>('date', 'fills_sort_by');

export const fillsSortByVariants: { [key in FillsSortBy]: Messages } = {
  date: 'fills.sort_by.date',
  PnL: 'fills.sort_by.pnl',
  quantity: 'fills.sort_by.quantity',
};

export const fillsSortDirection = storable<SortDirection>('ascending', 'fills_sort_dir');
