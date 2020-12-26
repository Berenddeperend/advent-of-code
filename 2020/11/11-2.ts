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

  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  const takenAdjSeats = directions.filter((adjSeat) => {
    let targetSeatFound = false;
    let lookPosX = 0;
    let lookPosY = 0;

    while(!targetSeatFound) {
      const [directionX, directionY] = adjSeat;
      lookPosX += directionX;
      lookPosY += directionY;

      const targetSeat = grid[y + lookPosY] && grid[y + lookPosY][x + lookPosX];
      switch(targetSeat) {
        case '.':
          break;
        case "L":
          return false;
        case undefined:
          return false;
        case "#":
          return true;
      }
    }
  });


  if (grid[y][x] === "L" && takenAdjSeats.length === 0) {
    return "#";
  } else if (grid[y][x] === "#" && takenAdjSeats.length >= 5) {
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
const answer = currentGrid.flat().filter((seat) => seat === "#").length;
console.log("answer: ", answer);

console.timeEnd("runtime");
