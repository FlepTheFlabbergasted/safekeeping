import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingChangesGuardComponent } from './pending-changes-guard.component';

describe('PendingChangesGuardComponent', () => {
  let component: PendingChangesGuardComponent;
  let fixture: ComponentFixture<PendingChangesGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingChangesGuardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingChangesGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('canDeactivateWithoutAlert', () => {
    it('should return true if of userHasAppropriateRoles$ is false', () => {
      component.userHasAppropriateRoles$ = signal(false);
      expect(component.canDeactivateWithoutAlert()).toBe(true);
    });

    it('should return inverse of hasPendingChanges if userHasAppropriateRoles$ is true', () => {
      component.userHasAppropriateRoles$ = signal(true);
      expect(component.canDeactivateWithoutAlert()).toBe(true);
      component.hasPendingChanges = true;
      expect(component.canDeactivateWithoutAlert()).toBe(false);
    });

    it('should call preventDefault and set returnValue to true on event if event is defined and we cannot deactivate without alert', () => {
      const eventMock = { preventDefault: jest.fn(), returnValue: undefined };
      component.userHasAppropriateRoles$ = signal(true);
      component.hasPendingChanges = true;

      expect(component.canDeactivateWithoutAlert(eventMock as unknown as Event)).toBe(false);
      expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);
      expect(eventMock.returnValue).toBe(true);
    });
  });
});
