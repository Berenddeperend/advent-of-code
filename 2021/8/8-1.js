console.time("runtime");
const fs = require("fs");
let input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((d) => d.split(" | "));

//  testvalues | output values

const table = {
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
  0: 6,
};
const segmentCounts = Object.values(table).reduce((acc, curr) => {
  acc.hasOwnProperty(curr) ? acc[curr]++ : (acc[curr] = 1);
  return acc;
}, {});

const uniqueChars = Object.entries(table).filter((entry) => {
  const [key, value] = entry;
  return segmentCounts[value] === 1;
});

console.log("uniqueChars: ", uniqueChars);

const outputvalues = input
  .map((d) => d[1].split(" "))
  .flat()
  .filter(d => uniqueChars.map(char => char[1]).includes(d.length))
  .length

console.log("outputvalues: ", outputvalues);

console.timeEnd("runtime");
