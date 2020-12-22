console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./9/input-sample.txt", "utf8").split("\n");
const preamble = 4 // 25

function validPreambleValue(value: number, array: number[]):boolean {
  return false;
}

for(let i = preamble; i < input.length; i++) {
   console.log(input[i])
}


console.timeEnd("runtime");
