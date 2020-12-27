console.time("runtime");
import { readFileSync } from "fs";

const [target, input] = readFileSync("2020/13/input-sample.txt", "utf8").split(
  "\n"
  );

const busses = input
  .split(",")
  .filter((d) => d !== "x")
  .map(d => parseInt(d))
  .map((d) => {
    return {
      id: d,
      // difference: getDifference(parseInt(target), parseInt(d))
      difference: d - parseInt(target) % d
    }
  })
  .sort((a, b) => a.difference - b.difference)

  console.log(busses)


console.log(busses[0].difference * busses[0].id);

console.timeEnd("runtime");
