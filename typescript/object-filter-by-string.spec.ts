import { objectFilterByString } from './object-filter-by-string';

describe('objectFilterByString', () => {
  const testArr = [{ name: 'Bob' }, { name: 'Alice' }];

  it('should return a subset of the array with elements that contains the filter string', () => {
    expect(objectFilterByString(testArr, 'name', 'bo')).toStrictEqual([{ name: 'Bob' }]);
    expect(objectFilterByString(testArr, 'name', '')).toStrictEqual([{ name: 'Bob' }, { name: 'Alice' }]);
  });
});
