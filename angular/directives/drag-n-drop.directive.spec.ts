import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DragNDropDirective } from './drag-n-drop.directive';

@Component({
  template: '<div dragNDrop>AAAAAAAAAAAAAAAAAAAAAAAAAAA</div>',
})
export class TestComponent {}

describe('DragNDropDirective', () => {
  let directive: DragNDropDirective;
  let divEl: HTMLDivElement;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DragNDropDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    divEl = fixture.debugElement.query(By.css('div')).nativeElement;
    directive = fixture.debugElement.query(By.directive(DragNDropDirective)).injector.get(DragNDropDirective);
    jest.spyOn(directive, 'stopEvent');
    jest.spyOn(directive, 'onDragOver');
    jest.spyOn(directive, 'onDragLeave');
    jest.spyOn(directive, 'onDrop');
    jest.spyOn(directive.fileDropped, 'emit');
  });

  it('should create an instance', () => {
    expect(divEl).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  describe('stopEvent', () => {
    it('should call preventDefault and stopPropagation on event', () => {
      const eventMock = { preventDefault: jest.fn(), stopPropagation: jest.fn() } as unknown as Event;
      directive.stopEvent(eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);
      expect(eventMock.stopPropagation).toHaveBeenCalledTimes(1);
    });
  });

  describe('HostListener events', () => {
    const dragoverEvent = new Event('dragover');
    const dragleaveEvent = new Event('dragleave');
    const dropEvent = new Event('drop');

    describe('dragover', () => {
      it('should call onDragOver, stop event and set fileOver to true', () => {
        divEl.dispatchEvent(dragoverEvent);
        expect(directive.onDragOver).toHaveBeenCalledWith(dragoverEvent);
        expect(directive.stopEvent).toHaveBeenCalledWith(dragoverEvent);
        expect(directive.fileOver).toBe(true);
      });
    });

    describe('dragleave', () => {
      it('should call onDragLeave, stop event and set fileOver to false', () => {
        directive.fileOver = true;
        divEl.dispatchEvent(dragleaveEvent);
        expect(directive.onDragLeave).toHaveBeenCalledWith(dragleaveEvent);
        expect(directive.stopEvent).toHaveBeenCalledWith(dragleaveEvent);
        expect(directive.fileOver).toBe(false);
      });
    });

    describe('drop', () => {
      it('should call onDrop, stop event and set fileOver to false', () => {
        directive.fileOver = true;
        divEl.dispatchEvent(dropEvent);
        expect(directive.onDrop).toHaveBeenCalledWith(dropEvent);
        expect(directive.stopEvent).toHaveBeenCalledWith(dropEvent);
        expect(directive.fileOver).toBe(false);
      });
    });
  });
});
