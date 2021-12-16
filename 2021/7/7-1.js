console.time("runtime");
const fs = require("fs");
let crabbies = fs
  .readFileSync("./input.txt", "utf8")
  .split(",")
  .map((d) => parseInt(d));

console.log(crabbies);

function findMostOptimalHorizontalPosition() {
  const maxPos = Math.max(...crabbies);
  const fuelSpentByPosition = [];
  for (let i = 0; i <= maxPos; i++) {
    fuelSpentByPosition.push(
      crabbies.reduce((acc, curr) => {
        return acc + Math.abs(i - curr);
      }, 0)
    );
  }
  const leastFuelSpent = Math.min(...fuelSpentByPosition);
  console.log("leastFuelSpent: ", leastFuelSpent);
  return leastFuelSpent;
}

findMostOptimalHorizontalPosition();

console.timeEnd("runtime");
