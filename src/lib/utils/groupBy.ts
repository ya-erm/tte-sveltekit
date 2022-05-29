/** Groups items by key */
export function groupBy<T, K extends string | number>(array: T[], selector: (item: T) => K) {
  return array.reduce((acc, item) => {
    const key = selector(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
