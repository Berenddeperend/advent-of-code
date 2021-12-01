console.time("runtime");
import { readFileSync } from "fs";
import * as lcm from 'compute-lcm';

const [target, input] = readFileSync("2020/13/input-sample.txt", "utf8").split(
  "\n"
);

let xes = 0

const busses = input
  .split(",")
  // .reduce((acc,curr,index) => {
  //   if(curr === 'x') {
  //     xes++;
  //     return acc;
  //   }
  //   acc.push(parseInt(curr) + index)
  //   return acc;
  // }, [])
  .filter(d => d !== "x")
  .map(d => parseInt(d))

  console.log(busses, lcm(busses))

console.timeEnd("runtime");