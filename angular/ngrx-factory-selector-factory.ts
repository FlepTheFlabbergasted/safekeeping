import { createSelector, MemoizedSelector } from '@ngrx/store';

export type MemoizedFactorySelectorMock = MemoizedSelector<unknown, unknown>;

/**
 * @see https://github.com/ngrx/platform/issues/3107#issuecomment-899970972
 * 
 * @example
 * import * as MyStore from '@my-project/my-store';
 * 
 * const mockMyStoreFactorySelector = mockNgrxFactorySelectorFactory(jest, MyStore);
 * mockMyStoreFactorySelector('mySelector', 'my mocked value');
 */
export const mockNgrxFactorySelectorFactory =
  (jest: unknown, moduleImport: unknown) =>
  (method: string, result: unknown): MemoizedFactorySelectorMock => {
    const selectorMock = createSelector(
      () => null,
      () => result
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (jest as any).spyOn(moduleImport, method).mockImplementation(() => selectorMock);

    return selectorMock;
  };
