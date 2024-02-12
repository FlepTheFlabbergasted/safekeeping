import { objectSortByNumber } from './object-sort-by-number';

describe('objectSortByNumber', () => {
  const testArr = [{ id: 1 }, { id: 0 }, { id: 2 }];

  it('should return array sorted by the element key in the specified sort direction and default to ascending', () => {
    expect(objectSortByNumber(testArr, 'id')).toStrictEqual([{ id: 0 }, { id: 1 }, { id: 2 }]);
    expect(objectSortByNumber(testArr, 'id', 'asc')).toStrictEqual([{ id: 0 }, { id: 1 }, { id: 2 }]);
    expect(objectSortByNumber(testArr, 'id', 'desc')).toStrictEqual([{ id: 2 }, { id: 1 }, { id: 0 }]);
  });
});
