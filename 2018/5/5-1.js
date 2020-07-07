console.time("runtime");
const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").split("");
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

function collapseStringOnce(arr) { 
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

function areSameLetters(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

function isLetterUpperCase(letter) {
  return upperCases.includes(letter);
}
function isLetterLowerCase(letter) {
  return lowerCases.includes(letter);
}

console.timeEnd("runtime"); 

//13359.806ms
//3435.430ms minus duplicate array