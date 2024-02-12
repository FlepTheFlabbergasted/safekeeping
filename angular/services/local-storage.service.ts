import { Inject, Injectable, Optional, SkipSelf, WritableSignal, signal } from '@angular/core';
import { WINDOW_TOKEN } from '../injection-tokens';
import { StateStorageConfig } from '../store/storage/storage.metareducer';

export const LOCAL_STORAGE_PKG_VERSION_NAME = 'localStoragePkgVersion';

/**
 * @example
 * @NgModule({
 *   declarations: [AppComponent],
 *   imports: [
 *     // ...
 *   ],
 *   providers: [
 *     // ...
 *     LocalStorageService,
 *     {
 *       provide: USER_PROVIDED_META_REDUCERS,
 *       deps: [LocalStorageService],
 *       useFactory: (storageService: LocalStorageService) => [
 *         storageMetaReducer(LOCAL_STORAGE_KEY, storageService),
 *         clearStateMetaReducer,
 *       ],
 *     },
 *   ],
 *  bootstrap: [AppComponent],
 * })
 * export class AppModule {
 *    constructor(private injector: Injector, private localStorageService: LocalStorageService) {
 *      setAppInjector(this.injector);
 *
 *      this.localStorageService.checkToClearStorage(
 *        LOCAL_STORAGE_KEY,
 *        CLEAR_STORAGE_ON_PKG_VERSION,
 *        environment.packageVersion
 *     );
 *   }
 * }
 * 
 * // ============================================================= //
 * 
 * @NgModule({
 *   imports: [
 *     CommonModule,
 *     StoreModule.forFeature(FEEDS_FEATURE_KEY, feedsReducer),
 *     EffectsModule.forFeature([FeedsEffects]),
 *   ]
 * })
 * export class MyStoreModule {
 *   constructor(private localStorageService: LocalStorageService) {
 *     this.localStorageService.registerStateStorageConfig({
 *       featureKey: FEEDS_FEATURE_KEY,
 *       stateKeys: ['myStateKeyToSave'],
 *       initialState: initialState,
 *       stateSaveActions: [myAction.type],
 *     });
 *   }
 * }
 * 
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private stateStorageConfig$: WritableSignal<StateStorageConfig[]> = signal([]);

  constructor(
    @Optional() @SkipSelf() sharedService: LocalStorageService,
    @Inject(WINDOW_TOKEN) private window: Window
  ) {
    if (sharedService) {
      throw new Error('LocalStorageService is already loaded. Import in your base AppModule only.');
    }
  }

  checkToClearStorage(localStorageKey: string, clearStorageOnPkgVersion: string, currentPkgVersion: string) {
    const savedPkgVersion = this.getSavedState(localStorageKey)[LOCAL_STORAGE_PKG_VERSION_NAME];

    if (savedPkgVersion === undefined || savedPkgVersion === clearStorageOnPkgVersion) {
      this.setSavedState(localStorageKey, { [LOCAL_STORAGE_PKG_VERSION_NAME]: currentPkgVersion });
    }
  }

  setSavedState(localStorageKey: string, state: object) {
    this.window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): Record<string, unknown> {
    return JSON.parse(this.window.localStorage.getItem(localStorageKey) || '{}');
  }

  registerStateStorageConfig(config: StateStorageConfig) {
    this.stateStorageConfig$.update((currConfig) => [...currConfig, config]);
  }

  getStateStorageConfigs(): StateStorageConfig[] {
    return this.stateStorageConfig$();
  }
}
