export function objectStringFilter<T>(arr: T[], key: keyof T, filter: string): T[] {
  if (!filter) {
    return arr;
  }

  const filterValue = filter.toLowerCase().replace(/ /g, '');

  // TODO: Probably exists a fancy way of telling the compiler "the return type of item[key] is a string" but I
  // couldn't find it. Send help.
  return arr.filter((item) => (item[key] as string).toLowerCase().replace(/ /g, '').includes(filterValue));
}
