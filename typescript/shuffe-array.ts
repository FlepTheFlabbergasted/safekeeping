export function shuffleArray<T>(array: T[] | undefined) {
  if (!array) return [];
  const returnArray = [...array];
  [...Array(returnArray.length)]
    .map((_el, i) => Math.floor(Math.random() * i))
    .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, returnArray);
  return returnArray;
}
