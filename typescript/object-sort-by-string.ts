import { SortDirection } from '@hyph-admin/api';

export function objectSortByString<T>(arr: T[], key: keyof T, sortDirection: SortDirection = SortDirection.Asc): T[] {
  // TODO: Probably exists a fancy way of telling the compiler "the return type of a[key] is a string" but I
  // couldn't find it. Send help.
  if (sortDirection === SortDirection.Asc) {
    return [...arr].sort((a, b) => (a[key] as string).localeCompare(b[key] as string, undefined, { numeric: true }));
  }

  return [...arr].sort((a, b) => (b[key] as string).localeCompare(a[key] as string, undefined, { numeric: true }));
}
