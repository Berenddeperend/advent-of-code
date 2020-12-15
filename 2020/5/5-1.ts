console.time("runtime");
import { readFileSync } from "fs";

let testMode = false;
const file = testMode ? "input-sample" : "input";
const input = readFileSync(`./5/${file}.txt`, "utf8").split("\n");

function getBoardingPassId(boardingPass: string): number {
  function findPosition(
    boardingPassSubstring: string,
    movesToBack: string
  ): number {
    return boardingPassSubstring.split("").reduce((acc, curr, index, arr) => {
      return curr === movesToBack
        ? acc + Math.pow(2, arr.length - index) / 2
        : acc;
    }, 0);
  }

  const row = findPosition(boardingPass.substring(0, 7), "B");
  const column = findPosition(boardingPass.substring(7), "R");

  return row * 8 + column;
}

const answer = input
  .map(getBoardingPassId)
  .sort((a, b) => a - b)
  .reverse()[0];

console.log("answer: ", answer);
console.timeEnd("runtime");
