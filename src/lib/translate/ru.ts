import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './messages';

export const ruDict: Dictionary = {
  'common.back': 'Назад',
  'common.select': 'Выбрать',
  'common.available_variants': 'Доступные варианты',
  'common.loading': 'Загрузка...',
  'common.show_more': 'Показать ещё',
  'common.sorting': 'Сортировка',
  'common.sort_by': 'Поле для сортировки',
  'common.sort_direction': 'Направление сортировки',
  'common.ascending': 'По возрастанию',
  'common.descending': 'По убыванию',
  'common.grouping': 'Группировка',
  'fills.title': 'Сделки',
  'fills.instrument_not_found': 'Не удалось найти сделки по инструменту',
  'fills.return_to_fills': 'Вернуться к списку позиций',
  'fills.shown_count':
    'Отображено {count, plural, one {# сделка} few {# сделки} other {# сделок}} из {total}',
  'fills.position.fills_count':
    '{count, plural, =0 {нет сделок} one {# сделка} few {# сделки} other {# сделок}}',
  'fills.options': 'Опции',
  'fills.group_by_instrument_type': 'Группировать по типу актива',
  'fills.sort_by.date': 'Дата',
  'fills.sort_by.pnl': 'Фин. результат',
  'fills.sort_by.quantity': 'Количество сделок',
  'instrument.groups.share': 'Акции',
  'instrument.groups.bond': 'Облигации',
  'instrument.groups.etf': 'ETF',
  'instrument.groups.futures': 'Фьючерсы',
  'instrument.groups.currency': 'Валюта',
  'instrument.groups.other': 'Прочее',
  'portfolio.title': 'Портфель',
  'settings.title': 'Настройки',
  'settings.language': 'Язык',
  'settings.select_language': 'Выберите язык',
  'settings.common': 'Общее',
  'settings.darkMode': 'Тёмная тема',
  'settings.security': 'Безопасность',
  'settings.token': 'API токен',
  'settings.enter_token': 'Введите API токен',
  'settings.for_data_access_in': 'для доступа к данным в',
  'settings.in_settings': 'Настройках',
  'settings.token_description':
    'Для доступа к данным о сделках используется токен, создать его можно в настройках личного кабинета',
  'settings.portfolio': 'Портфель',
  'settings.account': 'Счёт',
  'settings.select_account': 'Выберите счёт',
};

addMessages('ru-RU', ruDict);
