import { ChangeDetectionStrategy, Component, HostListener, Signal, signal } from '@angular/core';
import { CanDeactivateWithoutAlert } from '../../guards/pending-changes.guard';

@Component({
  selector: 'pending-changes-guard',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingChangesGuardComponent implements CanDeactivateWithoutAlert {
  userHasAppropriateRoles$: Signal<boolean> = signal(false);

  hasPendingChanges = false;
  canDeactivateComponentWithoutAlert = false;

  @HostListener('window:beforeunload', ['$event'])
  canDeactivateWithoutAlert(event?: Event): boolean {
    let canDeactivateWithoutAlert = this.userHasAppropriateRoles$() ? !this.hasPendingChanges : true;

    if (this.canDeactivateComponentWithoutAlert) {
      canDeactivateWithoutAlert = true;
    }

    // Needed for Chromium browsers to display confirmation window
    if (event && !canDeactivateWithoutAlert) {
      event.preventDefault();
      event.returnValue = true;
    }

    return canDeactivateWithoutAlert;
  }
}
