import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const enDict: Dictionary = {
  'portfolio.title' : 'Portfolio',
  'settings.title': 'Settings',
};

addMessages('en-US', enDict);