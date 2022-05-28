import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const ruDict: Dictionary = {
  'common.back': 'Назад',
  'common.select': 'Выбрать',
  'common.available_variants': 'Доступные варианты',
  'instrument.groups.share': 'Акции',
  'instrument.groups.bond': 'Облигации',
  'instrument.groups.etf': 'ETF',
  'instrument.groups.futures': 'Фьючерсы',
  'instrument.groups.currency': 'Валюта',
  'instrument.groups.other': 'Прочее',
  'portfolio.title': 'Портфель',
  'portfolio.position.fixed': 'PnL',
  'portfolio.fills': 'Сделки',
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
  'settings.portfolio': 'Портфель',
  'settings.account': 'Счёт',
  'settings.select_account': 'Выберите счёт',
};

addMessages('ru-RU', ruDict);
