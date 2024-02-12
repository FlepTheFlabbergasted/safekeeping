import { isObject } from './is-object';

/**
 * Perfrom a deep merge on one or multiple objects.
 *
 * @param target The object to merge into
 * @param sources Array(s) of object to copy from
 * @returns Object containing deeply copied values
 * @see https://stackoverflow.com/a/34749873
 *
 * @example
 * const obj1 = { key1: { key2: 'value2' } };
 * const obj2 = { key1: { key3: 'value3' } };
 *
 * mergeDeep({}, obj1, obj2) // { key1: { key2: 'value2', key3: 'value3' } }
 *
 * @example
 * // Take care here, if one value is a primitive but the other an object, the left hand side takes presedence
 * const obj1 = { key1: { key2: 'value2' } };
 * const obj2 = { key1: { key2: { key3: 'value3' } } };
 *
 * mergeDeep({}, obj1, obj2) // { key1: { key2: 'value2' } }
 *
 * @example
 * const obj1 = { key1: ['one', 'two'] };
 * const obj2 = { key1: ['one', 'three'] };
 *
 * mergeDeep({}, obj1, obj2) // { key1: ['one', 'three'] }
 */
export function mergeDeep(target: object, ...sources: object[]): object {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      const keyOfObj = key as keyof object;

      if (isObject(source[keyOfObj])) {
        if (!target[keyOfObj]) {
          Object.assign(target, { [key]: {} });
        }

        mergeDeep(target[keyOfObj], source[keyOfObj]);
      } else {
        Object.assign(target, { [key]: source[keyOfObj] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
