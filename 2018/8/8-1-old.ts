console.time("runtime");
//denon run -A --inspect-brk 8-1.ts test
//denon run -A 8-1.ts test

import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const testMode = !!Deno.args.length;

const input = readFileStrSync(testMode ? "./input-sample.txt" : "./input.txt", {
  encoding: "utf8",
})
  .split(" ")
  .map((string) => parseInt(string));

console.log("input: ", input);

const raport: { [iterationId: string]: number[] } = {};

function downTheRabbitHole(workArray: number[], iterationId: number) {
  debugger;
  const childNodesCount = workArray[0];
  const metaEntriesCount = workArray[1];
  // const proceedWith = workArray.filter((entry, index) => index > 1);

  if(childNodesCount === 0) {
    console.log('ik kom hier, geen children meer')
    let metadatas:number[] = [];
    for(let i = 0; i < metaEntriesCount; i++ ) {
      metadatas.push(workArray[i+2]);
    }
    raport[iterationId] = metadatas;
    return workArray.length -1; // -> the number its parent should skip. Deze is nog niet goed.
  } else {
    //deze else even uittekenen op papier.


    let moreChildrenToLoopOver = true;
    let childIndex = 0;
    let childShouldStartAtWorkArrayIndex:number = 1;

    while (moreChildrenToLoopOver) {
      const childWorkArray = workArray.filter((entry, index) => index > childShouldStartAtWorkArrayIndex)
      const childSaysToSkipNumberOfSteps = downTheRabbitHole(childWorkArray, iterationId + 1);
      childShouldStartAtWorkArrayIndex = childSaysToSkipNumberOfSteps + 2;
      
      if(childShouldStartAtWorkArrayIndex === workArray.length){
        moreChildrenToLoopOver = false;
      }
    }

    return 0

    // for(let i = 0; i < childNodesCount; i++ ) {
      // downTheRabbitHole(proceedWith, iterationId + i, isChildOf)
    // }  
  }
}


downTheRabbitHole(input, 0);

console.log(raport)

console.timeEnd("runtime"); //3ms
