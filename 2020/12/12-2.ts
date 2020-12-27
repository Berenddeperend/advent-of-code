console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("2020/12/input.txt", "utf8").split("\n");

type Position = {
  x: number;
  y: number;
};

function rotateWaypoint(wayPoint: Position, degrees: number) {
  const rotations = degrees / 90;

  for (let i = 0; i < Math.abs(rotations); i++) {
    const { x, y } = wayPoint;
    rotations > 0 ? (wayPoint.x = y) : (wayPoint.x = y * -1);
    rotations > 0 ? (wayPoint.y = x * -1) : (wayPoint.y = x);
  }
}

function moveWaypoint(wayPoint: Position, direction: string, quantity: number) {
  switch (direction) {
    case "N":
      wayPoint.y += quantity;
      break;
    case "S":
      wayPoint.y -= quantity;
      break;
    case "E":
      wayPoint.x += quantity;
      break;
    case "W":
      wayPoint.x -= quantity;
      break;
  }
}

function moveToWaypointNTimes(
  ship: Position,
  wayPoint: Position,
  times: number
) {
  for (let i = 0; i < times; i++) {
    ship.x += wayPoint.x;
    ship.y += wayPoint.y;
  }
}

const endPoint = input.reduce(
  (acc, curr) => {
    let [match, instruction, quantity]: any = /(\w)(\d+)/g.exec(curr);
    quantity = parseInt(quantity);

    switch (instruction) {
      case "L":
        rotateWaypoint(acc.wayPoint, quantity * -1);
        break;
      case "R":
        rotateWaypoint(acc.wayPoint, quantity);
        break;
      case "F":
        moveToWaypointNTimes(acc.ship, acc.wayPoint, quantity);
        break;
      default:
        moveWaypoint(acc.wayPoint, instruction, quantity);
    }

    return acc;
  },
  {
    ship: { x: 0, y: 0 },
    wayPoint: { x: 10, y: 1 },
  }
);

const answer = Math.abs(endPoint.ship.x) + Math.abs(endPoint.ship.y);
console.log("answer: ", answer);

console.timeEnd("runtime");
