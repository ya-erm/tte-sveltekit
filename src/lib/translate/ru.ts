import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const ruDict: Dictionary = {
  'portfolio.title' : 'Портфель',
  'settings.title': 'Настройки',
  'settings.language': 'Язык',
  'settings.common': 'Общее',
  'settings.darkMode': 'Тёмная тема',
};

addMessages('ru-RU', ruDict);