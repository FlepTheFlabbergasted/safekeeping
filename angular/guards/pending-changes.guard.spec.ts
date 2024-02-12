import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { WINDOW_TOKEN } from '../injection-tokens';
import { CanDeactivateWithoutAlert, pendingChangesGuard } from './pending-changes.guard';

describe('pendingChangesGuard', () => {
  let guard: CanDeactivateFn<CanDeactivateWithoutAlert>;

  const windowMock = new WindowMock();
  const activatedRouteSnapshotMock = new ActivatedRouteSnapshotMock() as unknown as ActivatedRouteSnapshot;
  const routerStateSnapshotMock = new RouterStateSnapshotMock() as unknown as RouterStateSnapshot;

  const componentMock = { canDeactivateWithoutAlert: jest.fn().mockReturnValue(true) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [pendingChangesGuard, { provide: WINDOW_TOKEN, useValue: windowMock }],
    });

    windowMock.confirm.mockReturnValue(false);

    guard = TestBed.runInInjectionContext(pendingChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true and not call window.confirm if component.canDeactivateWithoutAlert returns true', () => {
    const result = TestBed.runInInjectionContext(() =>
      guard(componentMock, activatedRouteSnapshotMock, routerStateSnapshotMock, routerStateSnapshotMock)
    );
    expect(result).toBe(true);
    expect(windowMock.confirm).not.toHaveBeenCalled();
  });

  it('should return result from window.confirm if component.canDeactivateWithoutAlert returns false', () => {
    componentMock.canDeactivateWithoutAlert.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      guard(componentMock, activatedRouteSnapshotMock, routerStateSnapshotMock, routerStateSnapshotMock)
    );
    expect(result).toBe(false);
    expect(windowMock.confirm).toHaveBeenCalledWith('Your changes have not been saved. Discard changes?');
  });
});
