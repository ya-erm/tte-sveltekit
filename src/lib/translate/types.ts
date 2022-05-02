export type Messages =
  | 'common.select'
  | 'portfolio.title'
  | 'settings.title'
  | 'settings.common'
  | 'settings.language'
  | 'settings.select_language'
  | 'settings.darkMode';

export type Dictionary = { [key in Messages]: string };

export type Locales = 'ru-RU' | 'en-US';
