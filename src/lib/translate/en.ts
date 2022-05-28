import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const enDict: Dictionary = {
  'common.back': 'Back',
  'common.select': 'Select',
  'common.available_variants': 'Available variants',
  'instrument.groups.share': 'Shares',
  'instrument.groups.bond': 'Bonds',
  'instrument.groups.etf': 'ETFs',
  'instrument.groups.futures': 'Futures',
  'instrument.groups.currency': 'Currencies',
  'instrument.groups.other': 'Other',
  'portfolio.title': 'Portfolio',
  'portfolio.position.fixed': 'Fixed',
  'portfolio.fills': 'Fills',
  'settings.title': 'Settings',
  'settings.language': 'Language',
  'settings.select_language': 'Select language',
  'settings.common': 'Common',
  'settings.darkMode': 'Dark mode',
  'settings.security': 'Security',
  'settings.token': 'API token',
  'settings.enter_token': 'Enter API token',
  'settings.token_description':
    'To access for your orders data app uses token, witch can be created in your account settings',
  'settings.portfolio': 'Portfolio',
  'settings.account': 'Account',
  'settings.select_account': 'Select account',
};

addMessages('en-US', enDict);
