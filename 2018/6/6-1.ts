console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const input: Coordinates[] = readFileStrSync("./input2.txt", {
  encoding: "utf8",
})
  .split("\n")
  .map((pair, index) => {
    let [x, y] = pair.split(", ").map((coordinate) => Number(coordinate));

    return { x, y, id: index } as Coordinates;
  });

const xs = input.map((entry) => entry.x);
const ys = input.map((entry) => entry.y);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);

/*
  add 'isInfinte' property to input
*/
input.map((coordinates) => {
  coordinates.isInfinite = (
    coordinates.x === minX ||
    coordinates.x === maxX ||
    coordinates.y === minY ||
    coordinates.y === maxY
  );
  return coordinates;
});

const candidates = input
.filter(coordinates => !coordinates.isInfinite)
.reduce((acc: Area, curr): Area => {
  acc[curr.id] = getAreaOfCoordinates(curr);
  return acc;
}, {})


console.log('candidates: ', candidates);

function getAreaOfCoordinates(coordinates: Coordinates):number {
  return 2; //todo
}

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

let grid = createGridStringFromGrid(createGrid(minX, maxX, minY, maxY));

function createGridStringFromGrid(grid: Grid): string {
  return grid.map((row) => row.join("")).join("\n");
}

// console.log(grid);




type Grid = string[][];
type Area = {[key:string]: number}
interface Coordinates {
  x: number;
  y: number;
  id: number;
  isInfinite?: boolean;
}

console.timeEnd("runtime");
