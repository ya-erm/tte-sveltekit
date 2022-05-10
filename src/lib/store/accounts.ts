import { usersApi, type V1Account } from '$lib/api';
import { derived, writable } from 'svelte/store';
import { initialised } from './initialisation';
import { storable } from './storable';

export const accounts = writable<V1Account[]>([]);

initialised.subscribe(async (initialised) => {
  if (!initialised) {
    return;
  }
  try {
    const result = await usersApi.usersServiceGetAccounts({});
    accounts.set(result.data.accounts ?? []);
  } catch (e) {
    console.error(e);
  }
});

export const selectedAccountId = storable<string | null>(null, 'selectedAccount');

export const selectedAccount = derived(
  [selectedAccountId, accounts],
  ([selectedAccountId, accounts]) => accounts?.find((account) => account.id == selectedAccountId),
);
