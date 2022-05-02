import type { Messages } from '$lib/translate';

type Route = {
  path: string;
  title: Messages;
};

export const routes: { [key: string]: Route } = {
  root: {
    path: '/',
    title: 'portfolio.title',
  },
  settings: {
    path: '/settings',
    title: 'settings.title',
  },
  'settings.language': {
    path: '/settings/language',
    title: 'settings.select_language',
  },
};
