import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { WINDOW_TOKEN } from '../injection-tokens';

/**
 * @example
 * export const routes: Route[] = [
 *   {
 *     path: '',
 *     canDeactivate: [pendingChangesGuard()],
 *     component: MyComponent,
 *   },
 * ];
 *
 * @NgModule({
 *   imports: [
 *     CommonModule,
 *     RouterModule.forChild(featureSectionLayoutsRoutes),
 *   ],
 *   declarations: [MyComponent],
 * })
 * export class MyModule {}
 * 
 * // ================================================================= //
 * 
 * export class MyComponent extends PendingChangesGuardComponent {
 *   constructor() {
 *     super();
 *     this.userHasAppropriateRoles$ = checkRoles();
 *   }
 * 
 *   changesHaveHappened() {
 *     hasChanges = true;
 *   }
 * 
 *   overrideChangeGuard() {
 *     this.canDeactivateComponentWithoutAlert = true;
 *   }
 * 
 */
export interface CanDeactivateWithoutAlert {
  canDeactivateWithoutAlert: (event?: Event) => boolean;
}

/**
 * This warning message will only be shown when navigating elsewhere within your angular app using the Angular router.
 * When navigating away from your Angular app, the browser will show a generic warning message.
 *
 * @see http://stackoverflow.com/a/42207299/7307355
 */
export function pendingChangesGuard(): CanDeactivateFn<CanDeactivateWithoutAlert> {
  return (component: CanDeactivateWithoutAlert): boolean => {
    const window = inject(WINDOW_TOKEN);

    return component.canDeactivateWithoutAlert()
      ? true
      : window.confirm('Your changes have not been saved. Discard changes?');
  };
}
