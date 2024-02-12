import { TestBed } from '@angular/core/testing';
import { ElementMock, WindowMock } from '@hyph-admin/test-util';
import { WINDOW_TOKEN } from '../injection-tokens';
import { DownloadFileService } from './download-file.service';

describe('DownloadFileService', () => {
  let service: DownloadFileService;

  const windowMock = new WindowMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WINDOW_TOKEN, useValue: windowMock }],
    });

    service = TestBed.inject(DownloadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('downloadStringFile', () => {
    let elementMock: ElementMock;
    const fileContent = 'ur mom';
    const filenameWithExtension = 'ligma.exe';

    beforeEach(() => {
      elementMock = new ElementMock();
      windowMock.document.createElement.mockReturnValue(elementMock);
      windowMock.document.defaultView.URL.createObjectURL.mockReturnValue('objectUrl');
    });

    it('should call create an invisible link and click it to download file', () => {
      service.downloadStringFile(fileContent, filenameWithExtension);

      expect(windowMock.document.defaultView.URL.createObjectURL).toHaveBeenCalledWith(new Blob([fileContent]));
      expect(windowMock.document.createElement).toHaveBeenCalledWith('a');

      expect(elementMock.setAttribute).toHaveBeenCalledWith('style', 'display: none');
      expect(elementMock.setAttribute).toHaveBeenCalledWith('href', 'objectUrl');
      expect(elementMock.setAttribute).toHaveBeenCalledWith('download', filenameWithExtension);
      expect(windowMock.document.body.appendChild).toHaveBeenCalledWith(elementMock);
      expect(elementMock.click).toHaveBeenCalledTimes(1);

      expect(windowMock.document.defaultView.URL.revokeObjectURL).toHaveBeenCalledWith('objectUrl');
      expect(elementMock.remove).toHaveBeenCalledTimes(1);
    });
  });
});
