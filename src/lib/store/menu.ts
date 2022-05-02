import { page } from '$app/stores';
import type { Messages } from '$lib/translate';
import { derived, readable } from 'svelte/store';
import { routes } from './routes';

export type MenuItem = {
  title: Messages;
  path: string;
};

export const menu = readable<MenuItem[]>([
  {
    title: 'portfolio.title',
    path: routes.root.path,
  },
  {
    title: 'settings.title',
    path: routes.settings.path,
  },
]);

export const activeMenuItem = derived([page, menu], ([p, m]) =>
  m.find((x) => x.path == p.url.pathname),
);
