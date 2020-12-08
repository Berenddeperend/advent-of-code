console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./3/input.txt", "utf8").split("\n");

function checkSlope(right: number, down: number): number {
  return input.reduce((trees, row, index) => {
    if (index === 0) return trees;
    if (index % down) return trees;
    trees = row[(index / down * right) % row.length] === "#" ? trees + 1 : trees;
    return trees;
  }, 0);
}

const answer = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].map((route) => checkSlope(route[0], route[1])).reduce((acc, curr) => acc * curr);
console.log('answer: ', answer);

console.timeEnd("runtime");
