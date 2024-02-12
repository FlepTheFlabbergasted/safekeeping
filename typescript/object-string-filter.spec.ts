import { objectStringFilter } from './object-string-filter';

describe('objectStringFilter', () => {
  const testObjects = [
    { id: 'id1', name: 'name1', type: 'first' },
    { id: 'id2', name: 'name2', type: 'second' },
    { id: 'id3', name: 'name3', type: 'third' },
  ];

  it('should return a subset of the input array that contains the filter string in the specified object key', () => {
    expect(objectStringFilter(testObjects, 'id', '2')).toStrictEqual([testObjects[1]]);
    expect(objectStringFilter(testObjects, 'name', '1')).toStrictEqual([testObjects[0]]);
    expect(objectStringFilter(testObjects, 'type', 'third')).toStrictEqual([testObjects[2]]);
  });
});
