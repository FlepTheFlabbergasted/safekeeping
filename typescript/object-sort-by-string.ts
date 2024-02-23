/**
 * Sort an array of objects by string elements
 *
 * @param arr Array of objects to be sorted
 * @param key Name of key to be filtered on
 * @returns The sorted array
 *
 * @example
 * const arr = [{ name: 'A2' }, { name: 'B' }, { name: 'A1' }]
 *
 * objectSortByString(arr, 'name') // [{ name: 'A1' }, { name: 'A2' }, { name: 'B' }]
 * objectSortByString(arr, 'name', 'desc) // [{ name: 'B' }, { name: 'A2' }, { name: 'A1' }]
 */
export function objectSortByString<T extends object,K extends keyof T>(
  arr: T[],
  key: K,
  sortDirection: 'asc' | 'desc' = 'asc'
): T[] {
  // TODO: Probably exists a fancy way of telling the compiler "the return type of a[key] is a string" but I
  // couldn't find it. Send help.
  if (sortDirection === 'asc') {
    return [...arr].sort((a, b) => (a[key] as string).localeCompare(b[key] as string, undefined, { numeric: true }));
  }

  return [...arr].sort((a, b) => (b[key] as string).localeCompare(a[key] as string, undefined, { numeric: true }));
}
