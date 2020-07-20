console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

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


// const candidates = input
// .filter(coordinates => !coordinates.isInfinite)
// .reduce((acc: Area, curr): Area => {
//   acc[curr.id] = getAreaOfCoordinates(curr);
//   return acc;
// }, {})


// console.log('candidates: ', candidates);

// function getAreaOfCoordinates(coordinates: Coordinates):number {
//   return 2; //todo
// }

function createGrid( // also wrong
  fromX: number,
  toX: number,
  fromY: number,
  toY: number
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
    output[coordinates.y - fromY][coordinates.x - fromX] = alphabet[coordinates.id].toUpperCase();
  });

  // calculate nearest coordinate for every point
  for (let i = fromY, j = 0; i < toY + 1; i++, j++) {
    for (let k = fromX, l = 0; k < toX + 1; k++, l++) {
      if(output[j][l] === ".") {
        output[j][l] = closestCoordinateFromPoint(i, k);
      }
    }
  }
  return output;
}

function closestCoordinateFromPoint(x:number, y:number):string {
  let isTie = false; //tie logic doesn't work yet
  
  const closest = input.reduce((closestCoordinateSoFar, curr):Coordinates => {
    let distance = getDistanceBetweenTwoPoints(curr.x, curr.y, x, y)
    let currentClosestDistance = getDistanceBetweenTwoPoints(closestCoordinateSoFar.x, closestCoordinateSoFar.y, x, y)
    if (distance === currentClosestDistance) {
      isTie = true;
    }
    if (distance < currentClosestDistance){ 
      closestCoordinateSoFar = curr;
      isTie = false;
    }
    return closestCoordinateSoFar
  });

  return isTie ? "." : alphabet[closest.id];
}

function getDistanceBetweenTwoPoints(x1:number, y1:number, x2:number, y2:number): number {
  return Math.abs((Math.abs(x1) - Math.abs(x2))) + Math.abs((Math.abs(y1) - Math.abs(y2)));
}

let grid = createGridStringFromGrid(createGrid(minX, maxX, minY, maxY));

function createGridStringFromGrid(grid: Grid): string {
  return grid.map((row) => row.join("")).join("\n");
}

console.log(grid);




type Grid = string[][];
// type Area = {[key:string]: number}
interface Coordinates {
  x: number;
  y: number;
  id: number;
  isInfinite?: boolean;
}

console.timeEnd("runtime");
