import { Injector } from '@angular/core';

// Code from https://stackoverflow.com/a/43695820

/**
 * Allows for retrieving singletons using `AppInjector.get(MyService)` (whereas
 * `ReflectiveInjector.resolveAndCreate(MyService)` would create a new instance
 * of the service).
 * 
 * @example
 * import { appInjector, WINDOW_TOKEN } from 'shared';
 * 
 * appInjector.get(WINDOW_TOKEN).location.hostname
 */
export let appInjector: Injector;

/**
 * Helper to set the exported {@link AppInjector}, needed as ES6 modules export
 * immutable bindings (see http://2ality.com/2015/07/es6-module-exports.html) for
 * which trying to make changes after using `import {AppInjector}` would throw:
 * "TS2539: Cannot assign to 'AppInjector' because it is not a variable".
 */
export function setAppInjector(injector: Injector) {
  if (appInjector) {
    // Should not happen
    throw new Error('Programming error: appInjector was already set');
  } else {
    appInjector = injector;
  }
}
