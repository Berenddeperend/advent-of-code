console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const testMode = !!Deno.args.length;

const input = readFileStrSync(testMode ? "./input-sample.txt" : "./input.txt", {
  encoding: "utf8",
})
  .split(" ")
  .map((string) => parseInt(string));

console.log("input: ", input);

const raport: { [iterationId: string]: addedMetaValues:number[] } = {};

function downTheRabbitHole(numArray: number[], iterationId: number, isChildOf: number | null) {
  const childNodesCount = numArray[0];
  const metaEntriesCount = numArray[1];
  const proceedWith = numArray.filter((entry, index) => index > 1);

  if(childNodesCount === 0) {
    let metadatas:number[] = [];
    for(let i = 0; i < metaEntriesCount; i++ ) {
      metadatas.push(numArray[i+2]);
    }
    raport[iterationId] = metadatas;

    return const numStepsParentShouldSkipToReachSibling = metaEntriesCount + 2; //
    
  } else {
    while()

    // for(let i = 0; i < childNodesCount; i++ ) {

    //   downTheRabbitHole(proceedWith, iterationId + i, isChildOf)
    // }  
  }



}

downTheRabbitHole(input, 0, null);

console.log(raport)

console.timeEnd("runtime"); //3ms
