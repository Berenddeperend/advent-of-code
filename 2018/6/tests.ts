import { getDistanceBetweenTwoPoints } from "./fns.ts";

let tests = [
  getDistanceBetweenTwoPoints(0,0,0,1) === 1,
  getDistanceBetweenTwoPoints(1,1,0,0) === 2,
  getDistanceBetweenTwoPoints(-1,-1,2,2) === 6,
  getDistanceBetweenTwoPoints(2,2,-1,-1) === 6,
  getDistanceBetweenTwoPoints(3,2,1,4) === 3, // incorrect!
].every(test => test);

console.log('tests: ', tests);

console.log(getDistanceBetweenTwoPoints(3,2,1,4))

