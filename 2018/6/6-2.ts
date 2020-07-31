console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";
import { getDistanceBetweenTwoPoints } from "./fns.ts";

const input: Coordinates[] = readFileStrSync("./input.txt", {
  encoding: "utf8",
})
  .split("\n")
  .map((pair, index) => {
    let [x, y] = pair.split(", ").map((coordinate) => Number(coordinate));
    return { x, y, id: index } as Coordinates;
  });

// const treshold = 32;
const treshold = 10000;

const xs = input.map((entry) => entry.x);
const ys = input.map((entry) => entry.y);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);

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
    output[coordinates.y - fromY][coordinates.x - fromX] = coordinates.id
      .toString();
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

function getOccurrences(grid: Grid, filters?: string[]): Occurrences {
  return grid.flat().reduce(
    (acc: Occurrences, curr: string) => {
      if (curr === ".") return acc;
      if (filters && filters.includes(curr)) return acc;
      acc.hasOwnProperty(curr) ? acc[curr]++ : acc[curr] = 1;
      return acc;
    },
    {},
  );
}

function findInfinites(
  occurrences1: Occurrences,
  occurrences2: Occurrences,
): string[] {
  const occurrences2Entries = Object.entries(occurrences2);
  return Object.entries(occurrences1).reduce((acc: string[], curr, index) => {
    if (curr[1] !== occurrences2Entries[index][1]) {
      acc.push(curr[0]);
    }
    return acc;
  }, []);
}

function getDistancesFromPointToCoordinates(x: number, y: number): number {
  return input.reduce((acc, curr, index) => {
    return acc + getDistanceBetweenTwoPoints(curr.x, curr.y, x, y);
  }, 0);
}

const baseGrid = createGrid(minX, maxX, minY, maxY);
const extendedGrid = createGrid(minX - 500, maxX + 500, minY - 500, maxY + 500);
const baseGridOccurrences = getOccurrences(baseGrid);
const extendedGridOccurrences = getOccurrences(extendedGrid);
const infinites = findInfinites(baseGridOccurrences, extendedGridOccurrences);
const occurrencesMinusInfinites = getOccurrences(baseGrid, infinites);

const nonInfinitePoints = input.filter((coordinates) => {
  return Object.keys(occurrencesMinusInfinites).includes(
    coordinates.id.toString()
    );
  });

const distances = extendedGrid.map((y, yIndex) => {
  return y.map((x, xIndex) => {
    return getDistancesFromPointToCoordinates(xIndex, yIndex);
  });
}).flat().filter((distance) => distance < treshold).length;

console.log(distances);  // 39624 is incorrect,  44868 maybe

type Grid = string[][];
interface Coordinates {
  x: number;
  y: number;
  id: number;
  isInfinite?: boolean;
}
type Occurrences = { [key: string]: number };

console.timeEnd("runtime");
//2268ms
