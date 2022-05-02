import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const ruDict: Dictionary = {
  'common.back': 'Назад',
  'common.select': 'Выбрать',
  'common.available_variants': 'Доступные варианты',
  'portfolio.title': 'Портфель',
  'settings.title': 'Настройки',
  'settings.language': 'Язык',
  'settings.select_language': 'Выберите язык',
  'settings.common': 'Общее',
  'settings.darkMode': 'Тёмная тема',
  'settings.security': 'Безопасность',
  'settings.token': 'API токен',
  'settings.enter_token': 'Введите API токен',
  'settings.token_description':
    'Для доступа к данным о сделках используется токен, создать его можно в настройках личного кабинета',
};

addMessages('ru-RU', ruDict);
