/**
 * Sort an array of objects by number elements
 *
 * @param arr Array of objects to be sorted
 * @param key Name of key to be filtered on
 * @returns The sorted array
 *
 * @example
 * const arr = [{ id: 1 }, { id: 0 }, { id: 2 }]
 *
 * objectSortByNumber(arr, 'id') // [{ id: 0 }, { id: 1 }, { id: 2 }]
 * objectSortByNumber(arr, 'id', SortDirection.Desc) // [{ id: 2 }, { id: 1 }, { id: 0 }]
 */
export function objectSortByNumber<T extends object, K extends keyof T>(
  arr: T[],
  key: K,
  sortDirection: 'asc' | 'desc' = 'asc'
): T[] {
  // TODO: Probably exists a fancy way of telling the compiler "the return type of a[key] is a number" but I
  // couldn't find it. Send help.
  if (sortDirection === 'asc') {
    return [...arr].sort((a, b) => ((a[key] as number) > (b[key] as number) ? 1 : -1));
  }

  return [...arr].sort((a, b) => ((a[key] as number) > (b[key] as number) ? -1 : 1));
}
