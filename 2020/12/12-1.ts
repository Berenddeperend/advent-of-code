console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("2020/12/input.txt", "utf8").split("\n");

type Position = {
  x: number;
  y: number;
  angle: number;
};

function findDirectionFromAngle(angle: number):string {
  const directions = ["N", "E", "S", "W"];
  const index = angle / 90 % directions.length;
  const answer = index < 0 ? directions[directions.length + index] : directions[index];
 return answer; 
}

function move(direction: string, quantity: number, obj: Position) {
  switch (direction) {
    case "N":
      obj.y += quantity;
      break;
    case "S":
      obj.y -= quantity;
      break;
    case "E":
      obj.x += quantity;
      break;
    case "W":
      obj.x -= quantity;
      break;
  }
}

const endPosition = input.reduce(
  (acc: Position, curr) => {
    let [match, instruction, quantity]: any = /(\w)(\d+)/g.exec(curr);
    quantity = parseInt(quantity);

    switch (instruction) {
      case "L":
        acc.angle -= quantity;
        break;
      case "R":
        acc.angle += quantity;
        break;
      case "F":
        move(findDirectionFromAngle(acc.angle), quantity, acc);
        break;
      default:
        move(instruction, quantity, acc);
    }

    return acc;
  },
  {
    x: 0,
    y: 0,
    angle: 90,
  }
);

console.log("endPosition: ", endPosition);

const answer = Math.abs(endPosition.x) + Math.abs(endPosition.y);
console.log("answer: ", answer);

console.timeEnd("runtime");
