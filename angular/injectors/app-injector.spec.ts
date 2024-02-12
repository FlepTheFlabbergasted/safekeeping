import { Injector } from '@angular/core';

describe('App Injector', () => {
  const injectorMock = {} as Injector;

  let appInjectorModule: typeof import('./app-injector');

  // Gotta reset module singleton in each test
  // Code from: https://github.com/jestjs/jest/issues/3236#issuecomment-698271251
  beforeEach(() => {
    return import('./app-injector').then((module) => {
      appInjectorModule = module;
      jest.resetModules();
    });
  });

  it('should set appInjector when setAppInjector is called', () => {
    expect(appInjectorModule.appInjector).toBeUndefined();
    appInjectorModule.setAppInjector(injectorMock);
    expect(appInjectorModule.appInjector).toBeDefined();
  });

  it('should throw error if appInjector is already defined when setAppInjector is called', () => {
    expect(appInjectorModule.appInjector).toBeUndefined();
    appInjectorModule.setAppInjector(injectorMock);
    expect(appInjectorModule.appInjector).toBeDefined();
    expect(() => appInjectorModule.setAppInjector(injectorMock)).toThrow(
      'Programming error: appInjector was already set'
    );
  });
});
