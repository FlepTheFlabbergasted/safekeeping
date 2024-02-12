/**
 *
 * @param objectEnum
 * @returns
 *
 * @example
 * type FooBarEnum = 'FOO' | 'BAR'
 *
 * const FooBarEnum = {
 *  Foo: 'FOO' as FooBarEnum,
 *  Bar: 'BAR' as FooBarEnum,
 * };
 *
 * getFlippedEnumMap(FooBarEnum); // Map([['FOO', 'Foo'], ['BAR', 'Bar']])
 *
 * @example
 * enum NumberEnum {
 *  One = 'ONE',
 *  Two = 'TWO',
 * };
 *
 * getFlippedEnumMap(NumberEnum); // Map([['ONE', 'One'], ['TWO', 'Two']])
 */
export function getFlippedEnumMap<R, K extends keyof R, V extends R[K]>(objectEnum: Record<K, V>): Map<V, K> {
  return Object.entries(objectEnum).reduce((map, [key, val]) => map.set(val, key), new Map());
}
