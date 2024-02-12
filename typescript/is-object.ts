/**
 * Check if item is an object.
 *
 * @param item Item to check
 * @returns true if item is an object
 *
 * @example
 * isObject({}) // true
 * isObject({ key: 'value' }) // true
 *
 * isObject(undefined); // false
 * isObject(null); // false
 * isObject('object'); // false
 * isObject(69); // false
 * isObject([]); // false
 */
export function isObject(item: unknown): boolean {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}
