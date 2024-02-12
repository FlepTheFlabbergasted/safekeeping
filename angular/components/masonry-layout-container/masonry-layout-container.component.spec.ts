import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserverMock } from '../../mock-classes';
import {
  MasonryLayoutBreakpointsMap,
  MasonryLayoutContainerComponent,
  unmatchedBreakpointKey,
} from './masonry-layout-container.component';

describe('MasonryLayoutContainerComponent', () => {
  let component: MasonryLayoutContainerComponent;
  let fixture: ComponentFixture<MasonryLayoutContainerComponent>;

  const breakpointObserverMock = new BreakpointObserverMock();

  const itemsMock: unknown[] = [{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }, { id: 'item4' }];
  const breakpointsMapMock: MasonryLayoutBreakpointsMap = {
    [Breakpoints.Small]: 1,
    [Breakpoints.Medium]: 2,
    [unmatchedBreakpointKey as string]: 3,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasonryLayoutContainerComponent],
      providers: [{ provide: BreakpointObserver, useValue: breakpointObserverMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MasonryLayoutContainerComponent);
    component = fixture.componentInstance;

    jest.spyOn(component.columnItems$, 'next');

    fixture.detectChanges();
  });

  afterAll(() => {
    breakpointObserverMock.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    describe('items', () => {
      const itemsChanges = { items: new SimpleChange(undefined, itemsMock, false) };

      beforeEach(() => {
        component.ngOnChanges(itemsChanges);
      });

      it('should call next on columnItems$ with new items and current number of columns', () => {
        expect(component.columnItems$.next).toHaveBeenCalledWith(component.divideIntoColumns(itemsMock, 1));
      });
    });

    describe('breakpointsMap', () => {
      const breakpointsMapChanges = { breakpointsMap: new SimpleChange(undefined, breakpointsMapMock, false) };

      beforeEach(() => {
        component.items = itemsMock;
        component.ngOnChanges(breakpointsMapChanges);
      });

      it('should call next on columnItems$ with current items and updated columns according to breakpointsMapMock', () => {
        breakpointObserverMock.resize(Breakpoints.Small);
        expect(component.nrColumns).toBe(1);
        expect(component.columnItems$.next).toHaveBeenCalledWith(component.divideIntoColumns(itemsMock, 1));

        breakpointObserverMock.resize(Breakpoints.Medium);
        expect(component.nrColumns).toBe(2);
        expect(component.columnItems$.next).toHaveBeenCalledWith(component.divideIntoColumns(itemsMock, 2));

        breakpointObserverMock.resize('other');
        expect(component.nrColumns).toBe(3);
        expect(component.columnItems$.next).toHaveBeenCalledWith(component.divideIntoColumns(itemsMock, 3));
      });
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      jest.spyOn(component.destroy$, 'next');
      jest.spyOn(component.destroy$, 'complete');
    });

    it('should call next and complete on destroy trigger', () => {
      component.ngOnDestroy();
      expect(component.destroy$.next).toHaveBeenCalledTimes(1);
      expect(component.destroy$.complete).toHaveBeenCalledTimes(1);
    });

    it('should call complete on behavior subjects', () => {
      jest.spyOn(component.columnItems$, 'complete');
      component.ngOnDestroy();
      expect(component.columnItems$.complete).toHaveBeenCalledTimes(1);
    });
  });

  describe('divideIntoColumns', () => {
    it('should return items divided into seperate arrays', () => {
      expect(component.divideIntoColumns(itemsMock, 1)).toStrictEqual([itemsMock]);
      expect(component.divideIntoColumns(itemsMock, 2)).toStrictEqual([
        [itemsMock[0], itemsMock[2]],
        [itemsMock[1], itemsMock[3]],
      ]);
      expect(component.divideIntoColumns(itemsMock, 3)).toStrictEqual([
        [itemsMock[0], itemsMock[3]],
        [itemsMock[1]],
        [itemsMock[2]],
      ]);
    });
  });
});
