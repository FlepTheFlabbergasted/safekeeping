import { Inject, Injectable } from '@angular/core';
import { WINDOW_TOKEN } from '../injection-tokens';

@Injectable({
  providedIn: 'root',
})
export class DownloadFileService {
  constructor(@Inject(WINDOW_TOKEN) private window: Window) {}

  downloadStringFile(fileContent: string, filenameWithExtension: string) {
    if (this.window.document.defaultView) {
      const objectUrl = this.window.document.defaultView.URL.createObjectURL(new Blob([fileContent]));

      const link: HTMLAnchorElement = this.window.document.createElement('a');
      link.setAttribute('style', 'display: none');
      link.setAttribute('href', objectUrl);
      link.setAttribute('download', filenameWithExtension);
      this.window.document.body.appendChild(link);
      link.click();

      this.window.document.defaultView.URL.revokeObjectURL(objectUrl);
      link.remove();
    }
  }
}
