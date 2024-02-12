import { Inject, Injectable } from '@angular/core';
import { WINDOW_TOKEN } from '../injection-tokens';

@Injectable({
  providedIn: 'root',
})
export class DownloadFileService {
  constructor(@Inject(WINDOW_TOKEN) private window: Window) {}

  downloadFromString(fileContent: string, filenameWithExtension: string): void {
    if (this.window.document.defaultView) {
      const objectUrl = this.window.document.defaultView.URL.createObjectURL(new Blob([fileContent]));
      this.downloadFromObjectUrl(objectUrl, filenameWithExtension);
    }
  }

  downloadFromBlob(blob: Blob, filenameWithExtension: string): void {
    if (this.window.document.defaultView) {
      const objectUrl = this.window.document.defaultView.URL.createObjectURL(blob);
      this.downloadFromObjectUrl(objectUrl, filenameWithExtension);
    }
  }

  downloadFromObjectUrl(objectUrl: string, filenameWithExtension: string): void {
    if (this.window.document.defaultView) {
      const link = this.createDownloadLink(objectUrl, filenameWithExtension);
      this.window.document.body.appendChild(link);
      link.click();

      this.window.document.defaultView.URL.revokeObjectURL(objectUrl);
      link.remove();
    }
  }

  createDownloadLink(objectUrl: string, filenameWithExtension: string): HTMLAnchorElement {
    const link: HTMLAnchorElement = this.window.document.createElement('a');
    link.setAttribute('style', 'display: none');
    link.setAttribute('href', objectUrl);
    link.setAttribute('download', filenameWithExtension);

    return link;
  }
}
