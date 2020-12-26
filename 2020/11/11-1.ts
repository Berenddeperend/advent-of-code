console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("2020/11/input.txt", "utf8")
  .split("\n")
  .map((s) => s.split(""));

function flattenGrid(grid: string[][]) {
  return grid.flat().join();
}

function findNextStateForPos(x: number, y: number, grid: string[][]) {
  if (grid[y][x] === ".") return ".";

  const adjSeats = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  const takenAdjSeats = adjSeats.filter((adjSeat) => {
    const [adjX, adjY] = adjSeat;
    const targetSeat = grid[y + adjY] && grid[y + adjY][x + adjX];
    return targetSeat === "#";
  });

  if (takenAdjSeats.length === 0) {
    return "#";
  } else if (takenAdjSeats.length >= 4) {
    return "L";
  } else {
    return grid[y][x];
  }
}

let currentGrid = input;
let nextGrid = generateNextGrid(currentGrid);

function generateNextGrid(grid: string[][]) {
  return grid.map((y, yIndex) => {
    return grid.map((x, xIndex) => {
      return findNextStateForPos(xIndex, yIndex, grid);
    });
  });
}

while (flattenGrid(currentGrid) !== flattenGrid(nextGrid)) {
  console.count('iteration')
  currentGrid = nextGrid;
  nextGrid = generateNextGrid(currentGrid);
}

const answer = nextGrid.flat().filter((seat) => seat === "#").length;
console.log("answer: ", answer);

console.timeEnd("runtime");
