console.time("runtime");
const fs = require("fs");
let input = fs
  .readFileSync("./input.txt", "utf8")
  .split(",")
  .map((d) => parseInt(d));

function createEmptyTable() {
  let initialObject = {};
  for (let i = 0; i <= 8; i++) {
    initialObject[i] = 0;
  }
  return initialObject;
}

let table = input.reduce((acc, curr) => {
  acc[curr]++;
  return acc;
}, createEmptyTable());

function loopthewhoop() {
  const newSpawns = table[0];

  for (let i = 0; i <= 7; i++) {
    table[`${i}`] = Math.max(0, table[`${i + 1}`]);
  }

  table[8] = newSpawns;
  table[6] = table[6] + newSpawns;
}

for (let i = 0; i < 256; i++) {
  loopthewhoop();
}

const answer = Object.values(table).reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log("answer: ", answer);

console.timeEnd("runtime");
