import { writable } from 'svelte/store';

export const title = writable<string | null>();

export const backLink = writable<string | null>();
