import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

export enum SizeComparison {
  SMALLER_THAN = -1,
  EQUAL= 0,
  BIGGER_THAN = 1,
}

/**
 * 
 * @example 
 * import { Component } from '@angular/core';
 * 
 * @Component({
 *   selector: 'app-root',
 *   styleUrls: ['./app.component.css'],
 *   template:
 *   `
 *     <div appSizeReporter (size)="size($event)" [widthBreakpoint]="500" (compareSize)="compareSize($event)">
 *       <p>Hello there, my parent div will report it's size to the controller!</p>
 *     </div>
 *   `,
 * })
 * export class AppComponent {
 *   // React to size changes
 *   size($event: CustomEvent): void {
 *     console.log($event); // e.g. { width: 600, height: 600}
 *   }
 * 
 *   compareSize($event: CustomEvent): void {
 *     console.log($event); // -1, 0 or 1
 *   }
 * }
 */
@Directive({
  selector: '[appSizeReporter]',
})
export class SizeCheckDirective implements AfterViewInit {
  @Input() widthBreakpoint: number; // Width in pixels to compare size to
  @Output() compareSize = new EventEmitter<SizeComparison>();
  @Output() size = new EventEmitter<{ width: number, height: number }>();

  private el: HTMLElement;
  private sizeComparison: SizeComparison;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event.target'])
  private onResize(): void {
    const { width, height } = this.el.getBoundingClientRect();

    this.size.emit({ width, height });

    if(this.widthBreakpoint) {
      this.checkBreakpoint(width);
    }
  }

  private checkBreakpoint(width: number): void {
    let newSizeComparison: SizeComparison;
    if(width > this.widthBreakpoint) {
      newSizeComparison = SizeComparison.BIGGER_THAN;
    } else if(width < this.widthBreakpoint) {
      newSizeComparison = SizeComparison.SMALLER_THAN;
    } else if(width === this.widthBreakpoint) {
      newSizeComparison = SizeComparison.EQUAL;
    }

    if(this.sizeComparison !== newSizeComparison) {
      this.compareSize.emit(newSizeComparison);
      this.sizeComparison = newSizeComparison;
    }
  }
}
