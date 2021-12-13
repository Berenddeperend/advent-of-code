console.time("runtime");
const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((line) => line.match(/(\d+,\d+)/g));

function parseLine(line) {
  const [from, to] = line;
  const [fromX, fromY] = from.split(",").map((d) => parseInt(d));
  const [toX, toY] = to.split(",").map((d) => parseInt(d));

  return { fromX, fromY, toX, toY };
}

const noDiagonals = input.filter((line) => {
    const { fromX, fromY, toX, toY } = parseLine(line);
  return fromX === toX || fromY === toY;
});

console.log(noDiagonals)

function logGrid(grid) {
  console.log(
    grid
      .map((d) => d.map((i) => (i == 0 ? "." : i)))
      .map((d) => d.join(" "))
      .join("\n")
  );
}

function createGrid(lines) {
  const maxX = Math.max(
    ...lines.map((line) => parseLine(line).fromX),
    ...lines.map((line) => parseLine(line).toX)
  );

  const maxY = Math.max(
    ...lines.map((line) => parseLine(line).fromY),
    ...lines.map((line) => parseLine(line).toY)
  );

  const gridSize = Math.max(maxX, maxY);

  let grid = [];
  for (let i = 0; i <= gridSize; i++) {
    grid.push([]);
    for (let j = 0; j <= gridSize; j++) {
      grid[i].push(0);
    }
  }

  return grid;
}

let grid = createGrid(noDiagonals);

noDiagonals.map((line) => {
  const c = parseLine(line); //c for coordinates
  const dir = c.fromY === c.toY ? "X" : "Y";
  const reverse = c.fromY > c.toY || c.fromX > c.toX;

  if (reverse) {
    for (let i = c["to" + dir]; i <= c["from" + dir]; i++) {
      dir === "X" ? grid[c.fromY][i]++ : grid[i][c.fromX]++;
    }
  } else {
    for (let i = c["from" + dir]; i <= c["to" + dir]; i++) {
      dir === "X" ? grid[c.fromY][i]++ : grid[i][c.fromX]++;
    }
  }
});


const deadlySpotsCount = grid.flat().reduce((acc, curr, i) => {
  return curr >= 2 ? ++acc : acc;
}, 0);

console.log("deadlySpotsCount: ", deadlySpotsCount);

console.timeEnd("runtime");
