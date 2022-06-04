import { usersApi, type V1Account } from '$lib/api';
import { derived, writable } from 'svelte/store';
import { initialised } from './initialisation';
import { storable } from './storable';

export const accounts = writable<V1Account[]>([]);

export const accountsState = writable<'initial' | 'loading' | 'success' | 'error'>('initial');

initialised.subscribe(async (initialised) => {
  if (!initialised) return;

  try {
    accountsState.set('loading');
    const result = await usersApi.usersServiceGetAccounts({});
    if (result.status === 200 && result.data.accounts) {
      accountsState.set('success');
      accounts.set(result.data.accounts ?? []);
    } else {
      accountsState.set('error');
    }
  } catch (e) {
    console.error(e);
    accountsState.set('error');
  }
});

export const selectedAccountId = storable<string | null>(null, 'selectedAccount');

export const selectedAccount = derived(
  [selectedAccountId, accounts],
  ([selectedAccountId, accounts]) => accounts?.find((account) => account.id == selectedAccountId),
);
