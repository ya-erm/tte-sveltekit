import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const ruDict: Dictionary = {
  'portfolio.title' : 'Портфель',
  'settings.title': 'Настройки',
};

addMessages('ru-RU', ruDict);