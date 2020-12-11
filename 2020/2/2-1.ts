console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2/input.txt", 'utf8').split("\n");

function isValid(entry:string):boolean {
  const min = parseInt(entry.split("-")[0]);
  const max = parseInt(entry.split("-")[1].split(" ")[0]);
  const letter = entry.split(":")[0][entry.split(":")[0].length-1];
  const subject = entry.split(" ")[2];

  const occurrences = Array.from(subject).reduce((acc, curr) => {
    return curr === letter ? ++acc : acc
  }, 0);

  return occurrences >= min && occurrences <= max;
}

const answer = input.reduce((acc, curr) => {
  return isValid(curr) ? ++acc : acc; 
}, 0);

console.log('answer: ', answer);

console.timeEnd("runtime");