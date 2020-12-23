console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./9/input.txt", "utf8").split("\n");
const preamble = 25; // 25

function validPreambleValue(value: number, array: number[]): boolean {
  return array.flatMap((preambleA, indexA) => {
    return array.map((preambleB, indexB) => {
      if(preambleA === preambleB) return false;
      return preambleA + preambleB === value;
    })
  }).some(d => d);
}

const firstInvalidNumber = input.reduce((acc, curr, index) => {
  if(index < preamble) return acc;
  if(acc > 0) return acc;
  
  const targetArray = input.slice(index - preamble, index).map(d => parseInt(d))
  const isValid = validPreambleValue(parseInt(curr), targetArray);
  
  return isValid ? acc : curr
}, 0);

console.log('firstInvalidNumber: ', firstInvalidNumber);

console.timeEnd("runtime");
