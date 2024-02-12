import { shuffleArray } from './shuffe-array';

describe('shufffleArray', () => {
  const toBeShuffled = ['1', '2', '3'];
  describe('shuffleArray', () => {
    it('should shuffle an array', () => {
      const shuffled = shuffleArray(toBeShuffled);
      expect(shuffled).not.toStrictEqual(toBeShuffled);
    });
    it('should return an empty array when passing in undefined', () => {
      expect(shuffleArray(undefined)).toStrictEqual([]);
    });
  });
});
