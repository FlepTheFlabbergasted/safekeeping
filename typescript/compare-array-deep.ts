/**
 * Performs a deep content comparison between two object arrays
 *
 * @param arrA Array containing objects to compare
 * @param arrB Array containing objects to compare
 *
 * @example
 * const arrA: object[] = [{ name: { first: 'a', last: 'b' } }];
 * const arrB: object[] = [{ name: { first: 'a', last: 'c' } }];
 * compareArrayDeep(arrA, arrB); // false
 *
 * const arrC: object[] = [{ name: 'yep' }, { name: 'sure' }];
 * const arrD: object[] = [{ name: 'yep' }, { name: 'sure' }];
 * console.log(compareArrayDeep(arrC, arrD)); // true
 *
 * // Arrays that have the same objects in different positions in the array will return true
 * const arrE: object[] = [{ side: 'left' }, { side: 'right' }];
 * const arrF: object[] = [{ side: 'right' }, { side: 'left' }];
 * console.log(compareArrayDeep(arrE, arrF)); // true
 *
 * @returns true if content of arrays are equal, false otherwise
 */
export function compareArrayDeep(arrA: object[], arrB: object[]): boolean {
  if (arrA.length !== arrB.length) return false;

  return arrA.every((objA: object) => arrB.find((objB: object) => compareObjDeep(objA, objB)));
}

/**
 * Performs a deep comparison between two objects
 *
 * @param objectA Object to compare
 * @param objectB Object to compare
 *
 * @example
 * compareObjDeep({ id: 'hi' }, { id: 'hello' }) // false
 * compareObjDeep({ name: 'yes' }, { name: 'yes' }) // true
 *
 * @returns true if objects are equal, false otherwise
 */
export function compareObjDeep(objectA: object, objectB: object): boolean {
  const keysA: string[] = Object.keys(objectA);
  const keysB: string[] = Object.keys(objectB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    const keyOfObj = key as keyof object;

    const valA: unknown = objectA[keyOfObj];
    const valB: unknown = objectB[keyOfObj];
    const areObjects: boolean = isObject(valA) && isObject(valB);
    if ((areObjects && !compareObjDeep(valA as object, valB as object)) || (!areObjects && valA !== valB)) {
      return false;
    }
  }

  return true;
}

export function isObject(value: unknown): boolean {
  return value !== null && typeof value === 'object';
}
