import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const enDict: Dictionary = {
  'portfolio.title' : 'Portfolio',
  'settings.title': 'Settings',
  'settings.language': 'Language',
  'settings.common': 'Common',
  'settings.darkMode': 'Dark mode',
};

addMessages('en-US', enDict);