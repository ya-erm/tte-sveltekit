export type Messages =
  | 'common.back'
  | 'common.select'
  | 'common.available_variants'
  | 'common.loading'
  | 'common.show_more'
  | 'common.sorting'
  | 'common.sort_by'
  | 'common.sort_direction'
  | 'common.ascending'
  | 'common.descending'
  | 'common.grouping'
  | 'fills.title'
  | 'fills.instrument_not_found'
  | 'fills.return_to_fills'
  | 'fills.shown_count'
  | 'fills.position.fills_count'
  | 'fills.options'
  | 'fills.group_by_instrument_type'
  | 'fills.sort_by.date'
  | 'fills.sort_by.pnl'
  | 'fills.sort_by.quantity'
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
  | 'settings.for_data_access_in'
  | 'settings.in_settings'
  | 'settings.token'
  | 'settings.enter_token'
  | 'settings.token_description'
  | 'settings.portfolio'
  | 'settings.account'
  | 'settings.select_account';

export type Dictionary = { [key in Messages]: string };

export type Locales = 'ru-RU' | 'en-US';
