console.time("runtime");
const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").split("");
const alphabet = "abcdefghijklmnopqrstuvwxyz";

const collapsedMinusLetter = alphabet.split("").reduce((acc, currLetter) => {
  console.log("Calculating for " + currLetter + '...');
  const inputWithoutLetter = input.filter(inputLetter => inputLetter.toLowerCase() !== currLetter.toLowerCase());
  acc[currLetter] = collapseFull(inputWithoutLetter);
  return acc;
}, {});

let answer = Object.entries(collapsedMinusLetter).sort((a, b) => a[1] - b[1])[0];
console.log('answer: ', answer);

function collapseFull(arr) {
  let workingCopy = [...arr];
  let doLoopAgain = true;

  while (doLoopAgain) {
    workingCopy = collapseStringOnce(workingCopy);
  }

  function collapseStringOnce(arr) { 
    for (let i = 0; i < arr.length - 1; i++) {
      let a = arr[i];
      let b = arr[i + 1];
      
      if (areSameLetters(a, b)) {
        if(
          (isLetterLowerCase(a) && isLetterUpperCase(b)) || 
          (isLetterUpperCase(a) && isLetterLowerCase(b))
          ) {
            arr.splice(i, 2);
            return arr;
          }
        }
      }
      
      doLoopAgain = false;
      return arr;
    }

  return workingCopy.length;
}

// console.log(collapseFull(input))

function areSameLetters(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

function isLetterUpperCase(letter) { 
  return letter === letter.toUpperCase();
}
function isLetterLowerCase(letter) {
  return letter === letter.toLowerCase();
}

console.timeEnd("runtime");
// runtime: 71913.369ms