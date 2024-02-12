/**
 * !IMPORTANT! Turn off the "--isolateModules" compiler flag for this file to be standalone.
 * Otherwise, just include this code in another file with existing exports.
 */

// Declare the extended interfaces in the global scope so that all files can use them
declare global {
  interface Number {
    map: (in_min: number, in_max: number, out_min: number, out_max: number) => number;
  }
}

Number.prototype.map = function(in_min: number, in_max: number, out_min: number, out_max: number): number {
  return (this.valueOf() - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Example usages
let n: number = 5
console.log( n.map(0, 10, -50, 50) );     // Prints '0'
console.log( n.map(-20, 0, -100, 100) );  // Prints '150'
