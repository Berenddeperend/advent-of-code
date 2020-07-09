import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";
console.log('readFileStrSync: ', readFileStrSync);


console.time("runtime");

const input = readFileStrSync("./input.txt", {encoding: "utf8"}).split("");
// const input = "aAbcDdeftghdk".split("");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const upperCases = alphabet.toUpperCase().split("");
const lowerCases = alphabet.toLowerCase().split("");

// let answer = loop([...input]);

let answer = [...input];
while (answer.length !== collapseStringOnce(answer).length) {
  answer = collapseStringOnce(answer);
}

console.log('answer: ', answer.length);

function collapseStringOnce(arr:string[]) { 
  const copy = [...arr];
  for (let i = 0; i < arr.length - 1; i++) {
    let a = arr[i];
    let b = arr[i + 1];

    if (areSameLetters(a, b)) {
      if(
        (isLetterLowerCase(a) && isLetterUpperCase(b)) || 
        (isLetterUpperCase(a) && isLetterLowerCase(b))
      ) {
        copy.splice(i, 2);
        return copy;
      }
    }
  }
  return copy;
}

function areSameLetters(a:string, b:string) {
  return a.toLowerCase() === b.toLowerCase();
}

function isLetterUpperCase(letter:string) {
  return upperCases.includes(letter);
}
function isLetterLowerCase(letter:string) {
  return lowerCases.includes(letter);
}

console.timeEnd("runtime"); 

//13359.806ms
//3435.430ms minus duplicate array