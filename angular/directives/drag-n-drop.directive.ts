import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

// Code from https://github.com/progtarek/angular-drag-n-drop-directive

@Directive({
  selector: '[dragNDrop]',
})
export class DragNDropDirective {
  @HostBinding('class.fileover') fileOver = false;
  @Output() fileDropped = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    this.stopEvent(event);
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    this.stopEvent(event);
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this.stopEvent(event);
    this.fileOver = false;

    const files = event.dataTransfer?.files;
    if ((files?.length || 0) > 0) {
      this.fileDropped.emit(files);
    }
  }

  stopEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
