import { operationsApi } from '$lib/api';
import { mapPortfolioPosition } from '$lib/api/mapping';
import type { PortfolioPosition } from '$lib/model';
import { writable } from 'svelte/store';
import { selectedAccount } from './accounts';

export const portfolio = writable<PortfolioPosition[]>([]);

selectedAccount.subscribe(async (account) => {
  if (!account) return;

  try {
    const response = await operationsApi.operationsServiceGetPortfolio({
      accountId: account.id,
    });
    portfolio.set(response.data?.positions?.map(mapPortfolioPosition) ?? []);
  } catch (error) {
    console.error(error);
  }
});
