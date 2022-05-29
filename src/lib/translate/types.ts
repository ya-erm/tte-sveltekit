export type Messages =
  | 'common.back'
  | 'common.select'
  | 'common.available_variants'
  | 'common.loading'
  | 'fills.title'
  | 'fills.instrument_not_found'
  | 'fills.return_to_fills'
  | 'fills.position.fills_count'
  | 'instrument.groups.share'
  | 'instrument.groups.bond'
  | 'instrument.groups.etf'
  | 'instrument.groups.futures'
  | 'instrument.groups.currency'
  | 'instrument.groups.other'
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
