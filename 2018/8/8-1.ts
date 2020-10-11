console.time("runtime");
//denon run -A --inspect-brk 8-1.ts test
//denon run -A 8-1.ts test

import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";
const testMode = !!Deno.args.length;
const input: number[] = readFileStrSync(
  testMode ? "./8/input-sample.txt" : "./8/input.txt",
  {
    encoding: "utf8",
  }
)
  .split(" ")
  .map((string) => parseInt(string));

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const raport: { [iterationId: string]: number[] } = {};
let iteration = 0;

function downTheRabbitHole(
  workArray: number[],
  iterationId: number
): number | void {
  debugger;
  const childNodesCount = workArray[0];
  const metaEntriesCount = workArray[1];

  if (childNodesCount === 0) {
    let metadatas: number[] = [];
    for (let i = 0; i < metaEntriesCount; i++) {
      metadatas.push(workArray[i + 2]);
    }
    raport[iterationId] = metadatas;
    return 2 + metaEntriesCount; //its length. Gaat goed.
  } else {
    let targetIndex = 1; //offset for the childnodes and meta indicators
    for (let i = 0; i < childNodesCount; i++) {
      iteration++;
      targetIndex =
        targetIndex +
        (downTheRabbitHole(
          workArray.filter(
            (entry, index) =>
              index > targetIndex && index < workArray.length - metaEntriesCount
          ),
          iteration
        ) as number);
    }

    // add own metadata
    let metadatas: number[] = [];
    for (let i = 0; i < metaEntriesCount; i++) {
      targetIndex++;
      metadatas.push(workArray[targetIndex]);
    } 
    raport[iterationId] = metadatas;
    return targetIndex; //almost!
  }
}
 
downTheRabbitHole(input, iteration);
console.log(raport);
const total = Object.values(raport)
  .flat()
  .reduce((acc, curr) => {
    acc = acc + curr;
    return acc;
  }, 0);
console.log("total: ", total);
console.timeEnd("runtime"); //3ms
