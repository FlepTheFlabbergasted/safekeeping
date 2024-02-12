/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 *
 * @param min
 * @param max
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random float between min and max (excluding min and max)
 *
 * @param min
 * @param max
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random member of an enum
 *
 * @param enumObj
 *
 * @throws error if input object is not valid
 */
export function randomEnum(enumObj: any): unknown {
  try {
    const rand = Math.floor(Math.random() * Object.keys(enumObj).length);
    return enumObj[Object.keys(enumObj)[rand]];
  } catch (error) {
    console.error('This is not a valid enum object');
    throw error;
  }
}

/**
 * Returns a random hex color string
 *
 * @example
 * getRandomHexColor() // '#000000' to '#FFFFFF'
 */
export function getRandomHexColor(): string {
  const letters: string = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

/**
 * returns a random rgb color object
 *
 * @example 
 * getRandomRgbColor() // { r: 0, g: 0, b: 0 } to { r: 255, g: 255, b: 255 }
 */
export function getRandomRgbColor(): { r: number; g: number; b: number } {
  return { r: getRandomInt(0, 255), g: getRandomInt(0, 255), b: getRandomInt(0, 255) };
}

/**
 * returns a random rgb color string
 *
 * @example 
 * getRandomRgbColorStr() // 'rgb(0, 0, 0)' to 'rgb(255, 255, 255)'
 */
export function getRandomRgbColorStr(): string {
  const rgb: { r: number; g: number; b: number } = getRandomRgbColor();
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export const rgbStringToArray = (rgbString: string): string[] => rgbString.replace(/[^\d,]/g, '').split(',');

export const hexToRgb = (hexVal: string): number[] | undefined =>
  hexVal.match(/[A-Za-z0-9]{2}/g)?.map((v) => parseInt(v, 16)); // .join(",");
