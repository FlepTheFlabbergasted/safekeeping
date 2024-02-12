import { SortDirection } from '@hyph-admin/api';

export function objectSortByNumber<T>(arr: T[], key: keyof T, sortDirection: SortDirection = SortDirection.Asc): T[] {
  // TODO: Probably exists a fancy way of telling the compiler "the return type of a[key] is a number" but I
  // couldn't find it. Send help.
  if (sortDirection === SortDirection.Asc) {
    return [...arr].sort((a, b) => ((a[key] as number) > (b[key] as number) ? 1 : -1));
  }

  return [...arr].sort((a, b) => ((a[key] as number) > (b[key] as number) ? -1 : 1));
}
