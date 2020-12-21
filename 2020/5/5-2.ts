console.time("runtime");
import { readFileSync } from "fs";

let testMode = false;
const file = testMode ? "input-sample" : "input";
const input = readFileSync(`./5/${file}.txt`, "utf8").split("\n");

const rowsMap = {};
const columnsMap = {};

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
  // rowsMap[row] = rowsMap[row] ? ++rowsMap[row] : 1; 
  rowsMap.hasOwnProperty(row) ? rowsMap[row].push(boardingPass) : rowsMap[row] = [boardingPass]
  const column = findPosition(boardingPass.substring(7), "R");
  columnsMap[column] = columnsMap[column] ? ++columnsMap[column] : 1; 

  return row * 8 + column;
}
//row = 72
//column = 3 || 7
// 583

console.log(rowsMap)
console.log(columnsMap)

console.timeEnd("runtime");
