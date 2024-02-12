import { moveItemInArray } from './move-item-in-array';

describe('moveItemInArray', () => {
  const arr = ['1', '3', '2'];

  it('should return a new array with the specified item moved', () => {
    expect(moveItemInArray(arr, 2, 1)).toStrictEqual(['1', '2', '3']);
    expect(moveItemInArray(arr, 2, 1)).not.toStrictEqual(arr);
  });
});
