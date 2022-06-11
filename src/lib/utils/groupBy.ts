/** Groups items by key */
export function groupBy<T, K extends string | number>(array: T[], selector: (item: T) => K) {
  return array.reduce((acc, item) => {
    const key = selector(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function toArray<T, K extends string | number>(
  groups: Record<K, T[]>,
): { key: K; items: T[] }[] {
  return Object.entries(groups).map(([key, items]) => ({ key, items })) as { key: K; items: T[] }[];
}
