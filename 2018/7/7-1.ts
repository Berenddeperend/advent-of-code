console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const testMode = !!Deno.args.length
console.log('testmode: ', testMode);

const input = readFileStrSync(testMode ? "./input-sample.txt" : "./input.txt", {
  encoding: "utf8",
}).split("\n").map(parseLine);

function buildOrderString(tuples:string[][]) {
  const outcome:string[] = [];
  const copiedTuples = [...tuples];
  

  // let ready = false;
  // while(!ready) {
    copiedTuples.map(tuple => {
    const [first, after] = tuple;
    if(!outcome.includes(first)) {
      outcome.push(first)
    } else {

    }

    if(!outcome.includes(after)) {
      outcome.push(after);
    }
  })
  // }

  
  return outcome.join("");
}

const output = buildOrderString(input);
console.log('output: ', output);


function parseLine(line:string) {
  return [line[5], line[36]];
}

console.timeEnd("runtime");
