console.time("runtime");
import { readFileSync } from "fs";

let testMode = false;
const file = testMode ? "input-sample" : "input";
const input = readFileSync(`./5/${file}.txt`, "utf8").split("\n");

const rows = 128;
const columns = 8;
const rowSpecifiers = 7;
const columnSpecifiers = 3;

const tickets = input
  .map((boardingPass) => {
    if (
      boardingPass.startsWith("FFF") ||
      boardingPass.startsWith("BBB")
    ) {
      return null;
    }

    let divider = 128;
    let minRow = 0;
    let maxRow = rows;
    for (let i = 0; i < rowSpecifiers; i++) {
      divider = divider / 2;
      if (boardingPass[i] === "F") {
        maxRow = maxRow - divider;
      } else {
        minRow = minRow + divider;
      }
    }

    divider = columns;
    let minColumn = 0;
    let maxColumn = columns;
    for (let i = rowSpecifiers; i < columnSpecifiers + rowSpecifiers; i++) {
      divider = divider / 2;
      if (boardingPass[i] === "L") {
        maxColumn = maxColumn - divider;
      } else {
        minColumn = minColumn + divider;
      }
    }

    return minRow * 8 + minColumn;
  })
  .filter((pass) => pass !== null)
  .sort((a, b) => a - b)
  .filter((pass, index, all) => {
    return all[index-1]+1 === pass && all[index+1]-1 === pass;
  })
  ;

console.log(tickets);

console.timeEnd("runtime");
