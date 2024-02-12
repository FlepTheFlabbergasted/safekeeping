import { SortDirection } from '@hyph-admin/api';
import { objectSortByNumber } from './object-sort-by-number';

describe('objectSortByNumber', () => {
  const testObjects = [{ id: 2 }, { id: 1 }, { id: 3 }];

  it('should return array sorted by the specified object key in the specified sort direction and default to ascending', () => {
    expect(objectSortByNumber(testObjects, 'id', SortDirection.Asc)).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(objectSortByNumber(testObjects, 'id', SortDirection.Desc)).toStrictEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);
    expect(objectSortByNumber(testObjects, 'id')).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
});
