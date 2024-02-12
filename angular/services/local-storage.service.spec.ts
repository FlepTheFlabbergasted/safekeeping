import { TestBed } from '@angular/core/testing';
import { WINDOW_TOKEN } from '../injection-tokens';
import { LOCAL_STORAGE_PKG_VERSION_NAME, LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const windowMock = new WindowMock();
  const localStorageKey = 'localStorageKey';
  const stateMock = { state: 'yass' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WINDOW_TOKEN, useValue: windowMock }],
    });

    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkToClearStorage', () => {
    const currentStoredPkgVer = '6.9.0';
    const clearStorageOnPkgVersion = '6.9.0';
    const currentAppPkgVer = '7.2.0';

    beforeEach(() => {
      jest.spyOn(service, 'setSavedState');
    });

    it('should clear state and set current pkg ver if current stored package version is equal to input clearStorageOnPkgVersion', () => {
      jest.spyOn(service, 'getSavedState').mockReturnValue({ [LOCAL_STORAGE_PKG_VERSION_NAME]: currentStoredPkgVer });
      service.checkToClearStorage(localStorageKey, clearStorageOnPkgVersion, currentAppPkgVer);

      expect(service.setSavedState).toHaveBeenCalledWith(localStorageKey, {
        [LOCAL_STORAGE_PKG_VERSION_NAME]: currentAppPkgVer,
      });
    });

    it('should clear state and set current pkg ver if current stored package version is not set', () => {
      jest.spyOn(service, 'getSavedState').mockReturnValue({});
      service.checkToClearStorage(localStorageKey, clearStorageOnPkgVersion, currentAppPkgVer);

      expect(service.setSavedState).toHaveBeenCalledWith(localStorageKey, {
        [LOCAL_STORAGE_PKG_VERSION_NAME]: currentAppPkgVer,
      });
    });

    it('should not clear state if current stored package version is not set', () => {
      jest.spyOn(service, 'getSavedState').mockReturnValue({ [LOCAL_STORAGE_PKG_VERSION_NAME]: currentStoredPkgVer });
      service.checkToClearStorage(localStorageKey, '1.3.3.7', currentAppPkgVer);

      expect(service.setSavedState).not.toHaveBeenCalled();
    });
  });

  describe('setSavedState', () => {
    it('should call localStorage.setItem on window', () => {
      service.setSavedState(localStorageKey, stateMock);
      expect(windowMock.localStorage.setItem).toHaveBeenCalledWith(localStorageKey, JSON.stringify(stateMock));
    });
  });

  describe('getSavedState', () => {
    it('should call localStorage.getItem on window and return an object', () => {
      windowMock.localStorage.getItem.mockReturnValue(JSON.stringify(stateMock));

      expect(service.getSavedState(localStorageKey)).toStrictEqual(stateMock);
      expect(windowMock.localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
    });

    it('should return empty object if nothing is stored in that key', () => {
      windowMock.localStorage.getItem.mockReturnValue(null);

      expect(service.getSavedState(localStorageKey)).toStrictEqual({});
      expect(windowMock.localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
    });
  });
});
