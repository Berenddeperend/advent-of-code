console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2/input.txt", 'utf8').split("\n");

function isValid(entry:string):boolean {
  const firstIndex = parseInt(entry.split("-")[0]);
  const secondIndex = parseInt(entry.split("-")[1].split(" ")[0]);
  const letter = entry.split(":")[0][entry.split(":")[0].length-1];
  const subject = entry.split(" ")[2];

  let count = 0;
  if(subject[firstIndex - 1] === letter) count++;
  if(subject[secondIndex - 1] === letter) count++;
  return count === 1;
}

const answer = input.reduce((acc, curr) => {
  if(isValid(curr)) {
    acc ++;
  }
  return acc;
}, 0);
console.log('answer: ', answer);

console.timeEnd("runtime");