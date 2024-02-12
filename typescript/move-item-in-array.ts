export function moveItemInArray<T>(arr: T[], previousIndex: number, currentIndex: number): T[] {
  const arrCopy = [...arr];

  const itemToMove = arrCopy.splice(previousIndex, 1)[0];

  return [...arrCopy.slice(0, currentIndex), itemToMove, ...arrCopy.slice(currentIndex)];
}
