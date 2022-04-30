import { writable } from 'svelte/store';

export const darkMode = writable(false);

export function toggleDarkMode() {
  darkMode.update((value) => !value);
}
