import { operationsApi } from '$lib/api';
import { mapMoneyValue, mapOperation } from '$lib/api/mapping';
import { isFillOperation, type Operation } from '$lib/model';
import { writable } from 'svelte/store';
import { selectedAccount } from './accounts';

export const operations = writable<Operation[]>([]);

selectedAccount.subscribe(async (account) => {
  if (!account) {
    return;
  }
  try {
    const result = await operationsApi.operationsServiceGetOperations({
      accountId: account?.id,
      from: new Date(2000, 0, 1, 0, 0, 0).toISOString(),
      to: new Date().toISOString(),
    });
    operations.set(
      result.data.operations
        ?.map((item) => {
          const operation = mapOperation(item);
          if (isFillOperation(operation)) {
            const feeOperation = result.data.operations?.find(
              (x) => x.parentOperationId == item.id,
            );
            operation.fee = mapMoneyValue(feeOperation?.payment) ?? 0;
          }
          return operation;
        })
        .sort((a, b) => {
          // sort by last trade executed or order creation if no trades
          const aDate = isFillOperation(a) ? a.trades[a.trades.length - 1]?.date ?? a.date : a.date;
          const bDate = isFillOperation(b) ? b.trades[b.trades.length - 1]?.date ?? b.date : b.date;
          return new Date(aDate).getTime() - new Date(bDate).getTime();
        }) ?? [],
    );
  } catch (e) {
    console.error(e);
  }
});
