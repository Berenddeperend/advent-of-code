console.time("runtime");
const fs = require("fs");
let crabbies = fs
  .readFileSync("./input.txt", "utf8")
  .split(",")
  .map((d) => parseInt(d));

function calculateFuelSpent(from, to) {
  const diff = Math.abs(from - to);
  let acc = 0;
  for(let i = 0; i <= diff; i++) {
    acc = acc + i
  }
  return acc
}

function findMostOptimalHorizontalPosition() {
  const maxPos = Math.max(...crabbies);
  const fuelSpentByPosition = [];
  for (let i = 0; i <= maxPos; i++) {
    fuelSpentByPosition.push(
      crabbies.reduce((acc, curr) => {
        return acc + calculateFuelSpent(curr, i)
      }, 0)
    );
  }
  const leastFuelSpent = Math.min(...fuelSpentByPosition);
  console.log("leastFuelSpent: ", leastFuelSpent);
  return leastFuelSpent;
}

findMostOptimalHorizontalPosition();

console.timeEnd("runtime");
