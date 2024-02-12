export function removeFileType(filename: string | undefined): string {
  // Remove the last occurence of a dot using negative lookahead regexp
  return filename?.replace(/\.(?:.(?!\.))+$/, '') || '';
}
