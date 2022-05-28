export type Messages =
  | 'common.back'
  | 'common.select'
  | 'common.available_variants'
  | 'instrument.groups.share'
  | 'instrument.groups.bond'
  | 'instrument.groups.etf'
  | 'instrument.groups.futures'
  | 'instrument.groups.currency'
  | 'instrument.groups.other'
  | 'portfolio.title'
  | 'portfolio.position.fixed'
  | 'portfolio.fills'
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
