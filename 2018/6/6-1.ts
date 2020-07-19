console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const input: Coordinates[] = readFileStrSync("./input2.txt", {
  encoding: "utf8",
})
  .split("\n")
  .map((pair) => {
    let [x, y] = pair.split(", ").map((coordinate) => Number(coordinate));
    return { x, y };
  });

const xs = input.map((entry) => entry.x);
const ys = input.map((entry) => entry.y);

function createGrid(
  fromX: number,
  toX: number,
  fromY: number,
  toY: number
): Grid {
  let output: Grid = [];

  for (let i = fromX, j = 0; i < toX + 1; i++, j++) {
    output.push([]);
    for (let k = fromY, l = 0; k < toY + 1; k++, l++) {
      output[j].push(".");
    }
  }

  input.forEach((item) => {
    output[item.x - fromX][item.y - fromY] = "x";
  });

  return output;
}

let grid = createGridStringFromGrid(
  createGrid(Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys))
);

function createGridStringFromGrid(grid: Grid): string {
  return grid.map((row) => row.join("")).join("\n");
}

console.log(grid);

type Grid = string[][];

interface Coordinates {
  x: number;
  y: number;
}

console.timeEnd("runtime");
