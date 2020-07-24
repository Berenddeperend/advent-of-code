console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";
import { getDistanceBetweenTwoPoints } from "./fns.ts";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const input: Coordinates[] = readFileStrSync("./input.txt", {
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

function createGrid(
  fromX: number,
  toX: number,
  fromY: number,
  toY: number,
): Grid {
  let output: Grid = [];

  //create skeleton
  for (let i = fromY, j = 0; i < toY + 1; i++, j++) {
    output.push([]);
    for (let k = fromX, l = 0; k < toX + 1; k++, l++) {
      output[j].push(".");
    }
  }

  //Add coordinates
  input.forEach((coordinates) => {
    output[coordinates.y - fromY][coordinates.x - fromX] =
    coordinates.id.toString();
  });

  // calculate nearest coordinate for every point
  for (let i = fromY, j = 0; i < toY + 1; i++, j++) {
    for (let k = fromX, l = 0; k < toX + 1; k++, l++) {
      if (output[j][l] === ".") {
        output[j][l] = closestCoordinateFromPoint(k, i);
      }
    }
  }
  return output;
}

function closestCoordinateFromPoint(x: number, y: number): string {
  let isTie = false;
  let closest: Coordinates | null = null;

  input.forEach((coordinates) => {
    let wasFirst = false;

    if (closest === null) {
      closest = coordinates;
      wasFirst = true;
    }
    let distance = getDistanceBetweenTwoPoints(
      coordinates.x,
      coordinates.y,
      x,
      y,
    );
    let currentClosestDistance = getDistanceBetweenTwoPoints(
      closest.x,
      closest.y,
      x,
      y,
    );

    if (distance === currentClosestDistance) {
      if (!wasFirst) {
        isTie = true;
      }
      closest = coordinates;
    }
    if (distance < currentClosestDistance) {
      closest = coordinates;
      isTie = false;
    }
  });

  // const letter = alphabet[(closest as unknown as Coordinates).id];
  const letter = (closest as unknown as Coordinates).id.toString();

  return isTie ? "." : letter;
}

// let grid = createGridStringFromGrid(createGrid(minX, maxX, minY, maxY));
let grid = createGrid(minX, maxX, minY, maxY).flat();

function createGridStringFromGrid(grid: Grid): string {
  return grid.map((row) => row.join("")).join("\n");
}
const occurences: object = grid.reduce(
  (acc: { [key: string]: number }, curr: string) => {
    if(curr === '.') return acc;
    if(input[parseInt(curr)].isInfinite) return acc;
    if (acc.hasOwnProperty(curr)) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  },
  {},
);

const most = Math.max(...Object.values(occurences));
console.log(occurences)
console.log('occurences length:', Object.keys(occurences).length)
console.log(input)
console.log('most: ', most);

type Grid = string[][];
// type Area = {[key:string]: number}
interface Coordinates {
  x: number;
  y: number;
  id: number;
  isInfinite?: boolean;
}

console.timeEnd("runtime");
