import { removeFileType } from './remove-file-type';

describe('removeFileType', () => {
  it('should file type ending from filename', () => {
    expect(removeFileType('filename.gif')).toBe('filename');
  });

  it('should file type ending from filename where there are multiple dots', () => {
    expect(removeFileType('filename.extra-stuff.gif')).toBe('filename.extra-stuff');
  });

  it('should return empty string if filename is undefined', () => {
    expect(removeFileType(undefined)).toBe('');
  });
});
