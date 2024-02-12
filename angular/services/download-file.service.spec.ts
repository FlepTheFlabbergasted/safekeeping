import { TestBed } from '@angular/core/testing';
import { WINDOW_TOKEN } from '../injection-tokens';
import { DownloadFileService } from './download-file.service';

describe('DownloadFileService', () => {
  let service: DownloadFileService;
  let elementMock: ElementMock;

  const windowMock = new WindowMock();

  const fileContent = 'ur mom';
  const filenameWithExtension = 'ligma.exe';
  const objectUrl = 'objectUrl';
  const blobMock = [0x01, 0x02, 0x03] as unknown as Blob;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WINDOW_TOKEN, useValue: windowMock }],
    });

    service = TestBed.inject(DownloadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('downloadFromString', () => {
    beforeEach(() => {
      jest.spyOn(service, 'downloadFromObjectUrl').mockImplementation(() => undefined);
      windowMock.document.defaultView.URL.createObjectURL.mockReturnValue(objectUrl);
    });

    it('should create an objectUrl from the filecontent string and call downloadFromObjectUrl', () => {
      service.downloadFromString(fileContent, filenameWithExtension);

      expect(windowMock.document.defaultView.URL.createObjectURL).toHaveBeenCalledWith(new Blob([fileContent]));
      expect(service.downloadFromObjectUrl).toHaveBeenCalledWith(objectUrl, filenameWithExtension);
    });
  });

  describe('downloadFromBlob', () => {
    beforeEach(() => {
      jest.spyOn(service, 'downloadFromObjectUrl').mockImplementation(() => undefined);
      windowMock.document.defaultView.URL.createObjectURL.mockReturnValue(objectUrl);
    });

    it('should create an objectUrl from the blob and call downloadFromObjectUrl', () => {
      service.downloadFromBlob(blobMock, filenameWithExtension);

      expect(windowMock.document.defaultView.URL.createObjectURL).toHaveBeenCalledWith(blobMock);
      expect(service.downloadFromObjectUrl).toHaveBeenCalledWith(objectUrl, filenameWithExtension);
    });
  });

  describe('downloadFromObjectUrl', () => {
    beforeEach(() => {
      elementMock = new ElementMock();
      jest.spyOn(service, 'createDownloadLink').mockReturnValue(elementMock as unknown as HTMLAnchorElement);
      windowMock.document.defaultView.URL.createObjectURL.mockReturnValue(objectUrl);
    });

    it('should create a link, append it to the body, click it and then revoke and remove it', () => {
      service.downloadFromObjectUrl(objectUrl, filenameWithExtension);

      expect(service.createDownloadLink).toHaveBeenCalledWith(objectUrl, filenameWithExtension);
      expect(windowMock.document.body.appendChild).toHaveBeenCalledWith(elementMock);
      expect(elementMock.click).toHaveBeenCalledTimes(1);

      expect(windowMock.document.defaultView.URL.revokeObjectURL).toHaveBeenCalledWith(objectUrl);
      expect(elementMock.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('createDownloadLink', () => {
    beforeEach(() => {
      elementMock = new ElementMock();
      windowMock.document.createElement.mockReturnValue(elementMock);
    });

    it('should return a link with href, style and download attributes set', () => {
      expect(service.createDownloadLink(objectUrl, filenameWithExtension));

      expect(windowMock.document.createElement).toHaveBeenCalledWith('a');
      expect(elementMock.setAttribute).toHaveBeenCalledWith('style', 'display: none');
      expect(elementMock.setAttribute).toHaveBeenCalledWith('href', objectUrl);
      expect(elementMock.setAttribute).toHaveBeenCalledWith('download', filenameWithExtension);
    });
  });
});
