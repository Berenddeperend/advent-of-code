console.time("runtime");
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const upperCases = alphabet.toUpperCase().split("");
const lowerCases = alphabet.toLowerCase().split("");

let answer = [...input];

while (loop(answer)) {
  answer = loop(answer);
}

console.log(answer.join(""));

function loop(arr) {
  if(!Array.isArray(arr)) return false;
  
  let didWork = true;

  let output = arr.reduce((acc, curr, i) => {
    const currAlphabetIndex = alphabet.indexOf(curr.toLowerCase());
    const currCase = upperCases.includes(curr) ? "upper" : "lower";

    if (
      currCase === "lower" && arr[i + 1] === upperCases[currAlphabetIndex + 1] ||
      currCase === "upper" && arr[i + 1] === lowerCases[currAlphabetIndex + 1]
    
    ) {
      // if (
      //   (upperCases.includes(curr[i]) && lowerCases.includes(curr[i + 1])) ||
      //   (lowerCases.includes(curr[i]) && upperCases.includes(curr[i + 1]))
      // ) {
      // console.log("eyah"); 
      acc.splice(i, 2);
      didWork = true;
    }
    return acc;
  }, arr);

  return didWork ? output : false;
}

console.timeEnd("runtime");
