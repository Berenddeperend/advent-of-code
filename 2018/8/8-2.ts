console.time("runtime");
//denon run -A --inspect-brk 8-1.ts test
//denon run -A 8-1.ts test

import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";
const testMode = !!Deno.args.length;
const input: number[] = readFileStrSync(
  testMode ? "./input-sample.txt" : "./input.txt",
  {
    encoding: "utf8",
  }
)
  .split(" ")
  .map((string) => parseInt(string));

function downTheRabbitHole(
  workArray: number[]
): { length: number; value: number } {
  const childNodesCount = workArray[0];
  const metaEntriesCount = workArray[1];

  if (childNodesCount === 0) {
    let value = workArray.reduce((acc, curr, index) => { //hier tel ik te ver door
      if (index >= 2 && index < metaEntriesCount + 2) {
        acc = acc + curr;
      } 
      return acc;
    }, 0);

    return {
      length: 2 + metaEntriesCount,
      value,
    };
  } else {
    let targetIndex = 1; //offset for the childnodes and meta indicators
    let children = [];

    for (let i = 0; i < childNodesCount; i++) {
      let childWorkArray = workArray.filter(
        (entry, index) => index > targetIndex
        );
        let child = downTheRabbitHole(childWorkArray);
        children.push(child);
        targetIndex += child.length;
      }
      
    // add own metadata
    let value = 0;

    targetIndex++;
    for (let i = 0; i < metaEntriesCount; i++) {
      let target = children[workArray[targetIndex] - 1];
      if(target) value = value + target.value;
      targetIndex++;
    }

    return {
      length: targetIndex,
      value
    }
  }
}

let result = downTheRabbitHole(input);
console.log('result: ', result);

console.timeEnd("runtime"); //441ms
