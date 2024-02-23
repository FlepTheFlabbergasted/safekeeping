import { objectSortByString } from './object-sort-by-string';

describe('objectSortByString', () => {
  const testArr = [{ name: 'A2' }, { name: 'B' }, { name: 'A1' }];

  it('should return array sorted by the element key in the specified sort direction and default to ascending', () => {
    expect(objectSortByString(testArr, 'name')).toStrictEqual([{ name: 'A1' }, { name: 'A2' }, { name: 'B' }]);
    expect(objectSortByString(testArr, 'name', 'asc')).toStrictEqual([
      { name: 'A1' },
      { name: 'A2' },
      { name: 'B' },
    ]);
    expect(objectSortByString(testArr, 'name', 'desc')).toStrictEqual([
      { name: 'B' },
      { name: 'A2' },
      { name: 'A1' },
    ]);
  });
});
