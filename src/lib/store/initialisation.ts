import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { token } from './token';

export const initialised = writable(false);

token.subscribe((token) => {
  if (browser && token && token !== '') {
    initialised.set(true);
  }
});
