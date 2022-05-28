import { isFillOperation, OperationType, type Fill, type Operation } from '$lib/model';
import { calculateFills } from '$lib/model/calculate';
import { derived } from 'svelte/store';
import { operations } from './operations';

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
