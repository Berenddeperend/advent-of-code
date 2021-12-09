console.time("runtime");
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

function getBitOccurrences(arr) {
  return arr.reduce(
    (acc, curr, i) => {
      curr
        .split("")
        .map((d) => parseInt(d))
        .map((d, dI) => {
          d ? acc[dI]["ones"]++ : acc[dI]["zeroes"]++;
        });
      return acc;
    },
    new Array(input[0].length).fill().map((d) => ({ zeroes: 0, ones: 0 }))
  );
}

function getRating(significantBit) {
  let survivors = [...input];
  for (let codeIndex = 0; codeIndex < input[0].length; codeIndex++) {
    //six times
    if (survivors.length === 1) {
      return survivors[0];
    }

    const bitOccurrences = getBitOccurrences(survivors);
    let winningBit;

    if (significantBit === 1) {
      winningBit =
        bitOccurrences[codeIndex]["ones"] >= bitOccurrences[codeIndex]["zeroes"]
          ? 1
          : 0;
    } else {
      winningBit =
        bitOccurrences[codeIndex]["zeroes"] <= bitOccurrences[codeIndex]["ones"]
          ? 0
          : 1;
    }

    survivors = survivors.filter(
      (code) => parseInt(code[codeIndex]) === winningBit
    );
  }
  return survivors;
}

const oxygenGeneratorRating = getRating(1);
const co2ScrubberRating = getRating(0);

const answer =
  parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
console.log("answer: ", answer);

console.timeEnd("runtime");
