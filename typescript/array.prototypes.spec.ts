import './array.prototypes';

describe('Array prototype', () => {
  describe('difference', () => {
    it('should return the elements ocurring in the array but not ocurring in the input array', () => {
      expect([1, 2, 3].difference([2, 3])).toStrictEqual([1]);
    });
  });

  describe('selectDuplicates', () => {
    it('should return the repeated values in array, excluding the 1st occurrence', () => {
      expect([1, 2, 3, 3].getDuplicates()).toStrictEqual([3]);
      expect([1, 2, 3, 3, 3].getDuplicates()).toStrictEqual([3, 3]);
    });
  });

  describe('joinReplaceLast', () => {
    it('should return a string with the elements separated with the separator string except for the last occurence', () => {
      expect([1, 2, 3].joinReplaceLast(',', 'and')).toBe('1, 2 and 3');
    });
  });

  describe('removeDuplicates', () => {
    it('should return an array without the duplicate values', () => {
      expect([1, 2, 3, 3].removeDuplicates()).toStrictEqual([1, 2, 3]);
    });
  });
});
