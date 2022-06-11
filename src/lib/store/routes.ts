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
  portfolio: {
    path: '/portfolio',
    title: 'portfolio.title',
  },
  fills: {
    path: '/fills',
    title: 'fills.title',
  },
  'fills.options': {
    path: '/fills/options',
    title: 'fills.options',
  },
  'fills.sorting': {
    path: '/fills/sorting',
    title: 'common.sorting',
  },
  settings: {
    path: '/settings',
    title: 'settings.title',
  },
  'settings.language': {
    path: '/settings/language',
    title: 'settings.select_language',
  },
  'settings.token': {
    path: '/settings/token',
    title: 'settings.enter_token',
  },
  'settings.account': {
    path: '/settings/account',
    title: 'settings.select_account',
  },
};

export function findRoute(path: string) {
  return Object.values(routes).find((route) => route.path == path);
}
