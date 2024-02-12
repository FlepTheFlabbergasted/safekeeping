/**
 * Filter an array of objects
 *
 * @param arr Array of objects to be filtered
 * @param key Name of key to be filtered on
 * @param filter String to filter elements by
 * @returns The elements of the array that includes the filter string
 *
 * @example
 * const arr = [{ name: 'Bob' }, { name: 'Alice' }]
 *
 * objectFilterByString(arr, 'name', 'bo')  // [{ name: 'Bob' }]
 * objectFilterByString(arr, 'name', '')    // [{ name: 'Bob' }, { name: 'Alice' }]
 */
export function objectFilterByString<T extends object, K extends keyof T>(arr: T[], key: K, filter: string): T[] {
  if (!filter) {
    return arr;
  }

  const lowercaseFilter = filter.toLowerCase();

  // TODO: Probably exists a fancy way of telling the compiler "the return type of item[key] is a string" but I
  // couldn't find it. Send help.
  return arr.filter((item) => (item[key] as string).toLowerCase().includes(lowercaseFilter));
}
