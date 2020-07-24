import { getDistanceBetweenTwoPoints } from "./fns.ts";

let tests = [
  getDistanceBetweenTwoPoints(0,0,0,1) === 1,
  getDistanceBetweenTwoPoints(1,1,0,0) === 2,
  getDistanceBetweenTwoPoints(-1,-1,2,2) === 6,
  getDistanceBetweenTwoPoints(2,2,-1,-1) === 6,
  getDistanceBetweenTwoPoints(3,2,1,4) === 4,
  getDistanceBetweenTwoPoints(3,3,2,1) === 3,
  getDistanceBetweenTwoPoints(2,1,3,3) === 3,
].every(test => test);

console.log('tests: ', tests);
