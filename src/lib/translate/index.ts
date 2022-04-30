import { format, getLocaleFromNavigator, init, locale } from 'svelte-i18n';
import type { Readable } from 'svelte/store';
import './en';
import './ru';
import type { Messages } from './types';

export type { Messages } from './types';

init({
  fallbackLocale: 'en-US',
  initialLocale: getLocaleFromNavigator(),
});

type FormatOptions = {
  locale?: string;
  format?: string;
  default?: string;
  values?: Record<string, string | number | boolean | Date | null | undefined> | undefined;
};
type MessageFormatter = (id: Messages, options?: FormatOptions) => string;

export const t = format as Readable<MessageFormatter>;

// TODO
locale.set('ru-RU');
