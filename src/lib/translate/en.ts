import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './types';

export const enDict: Dictionary = {
  'common.select': 'Select',
  'common.available_variants': 'Available variants',
  'portfolio.title': 'Portfolio',
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
};

addMessages('en-US', enDict);
