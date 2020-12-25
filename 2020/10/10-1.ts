console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./10/input.txt", "utf8")
.split("\n")
.map((d) => parseInt(d))
.sort((a,b) => a - b);

input.unshift(0) //outlet
input.push(input[input.length -1 ] + 3) //your device

const map = input.reduce((acc, curr, index) => {
  const diff = input[index +1] - curr;
  if (!diff) return acc;
  acc.hasOwnProperty(diff) ? 
    acc[diff] ++:
    acc[diff] = 1;

  return acc;
}, {})

const answer = map['1'] * map['3'];
console.log('answer: ', answer);

console.timeEnd("runtime");
