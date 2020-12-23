console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./9/input.txt", "utf8")
  .split("\n")
  .map((d) => parseInt(d));
const preamble = 25; // 25
const minimumWeaknessArrayLength = 2;

function validPreambleValue(value: number, array: number[]): boolean {
  return array
    .flatMap((preambleA, indexA) => {
      return array.map((preambleB, indexB) => {
        if (preambleA === preambleB) return false;
        return preambleA + preambleB === value;
      });
    })
    .some((d) => d);
}

const firstInvalidNumber = input.reduce((acc, curr, index) => {
  if (index < preamble) return acc;
  if (acc > 0) return acc;

  const targetArray = input.slice(index - preamble, index);
  const isValid = validPreambleValue(curr, targetArray);

  return isValid ? acc : curr;
}, 0);

const weaknessArray = input.reduce((accA, currA, indexA) => {
  if (accA.length) return accA;

  input
    .filter((d, indexB) => indexB >= indexA)
    .reduce((accB, currB, indexB) => {
      const newTotal = [...accB, currB].reduce((a, b) => a + b);
      if (
        newTotal === firstInvalidNumber &&
        indexB >= minimumWeaknessArrayLength
      ) {
        accA = [...accB, currB];
        return newTotal;
      } else {
        return [...accB, currB];
      }
    }, []);

  return accA;
}, []);

const answer = Math.min(...weaknessArray) + Math.max(...weaknessArray);
console.log("answer: ", answer);

console.timeEnd("runtime"); // around 6 seconds, a bit long but I'll take it
