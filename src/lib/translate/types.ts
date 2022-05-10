export type Messages =
  | 'common.back'
  | 'common.select'
  | 'common.available_variants'
  | 'portfolio.title'
  | 'settings.title'
  | 'settings.common'
  | 'settings.language'
  | 'settings.select_language'
  | 'settings.darkMode'
  | 'settings.security'
  | 'settings.token'
  | 'settings.enter_token'
  | 'settings.token_description'
  | 'settings.portfolio'
  | 'settings.account'
  | 'settings.select_account';

export type Dictionary = { [key in Messages]: string };

export type Locales = 'ru-RU' | 'en-US';
