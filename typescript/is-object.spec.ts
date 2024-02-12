import { isObject } from './is-object';

describe('isObject', () => {
  it('should return true if object is an object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: 'value' })).toBe(true);
  });

  it('should return false if object is not an object or array', () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject('object')).toBe(false);
    expect(isObject(69)).toBe(false);
    expect(isObject([])).toBe(false);
  });
});
