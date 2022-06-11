import type { Messages } from '$lib/translate';

export type SortDirection = 'ascending' | 'descending';

export const sortDirectionVariants: { [key in SortDirection]: Messages } = {
  ascending: 'common.ascending',
  descending: 'common.descending',
};

export function withSortDirection<T>(direction: SortDirection, comparer: (a: T, b: T) => number) {
  return direction == 'ascending' ? (a: T, b: T) => comparer(a, b) : (a: T, b: T) => comparer(b, a);
}
