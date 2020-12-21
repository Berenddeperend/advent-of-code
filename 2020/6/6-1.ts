console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./6/input-sample.txt", "utf8").split("\n\n");

const answer = input.reduce((total, group) => {
  const groupMap = group.split("\n").reduce((groupMap, person) => {
    person.split("").forEach(answer => {
      groupMap.hasOwnProperty(answer)
        ? groupMap[answer]++
        : groupMap[answer] = 1;
    });
    return groupMap;
  }, {});

  console.log(groupMap)
  return total + Object.keys(groupMap).length;
}, 0);



console.log(answer);

console.timeEnd("runtime");
