console.time("runtime");
import { readFileSync } from "fs";
import { memoize } from "./../utils";

const input = readFileSync("./10/input.txt", "utf8")
  .split("\n")
  .map((d) => parseInt(d))
  .sort((a, b) => a - b);

input.unshift(0); //outlet
input.push(input[input.length - 1] + 3); //your device

const findPathsRecursively = memoize((startPoint: number): number => {
  const nextPossiblePaths = input.filter((d) => d > startPoint && d <= startPoint + 3);
  if(!nextPossiblePaths.length) return 1;
  
  return nextPossiblePaths.reduce((acc, curr, index) => {
    return acc + findPathsRecursively(curr);
  }, 0)
});

const answer = findPathsRecursively(input[0]);
console.log('answer: ', answer);

console.timeEnd("runtime");
