console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const testMode = !!Deno.args.length;

const input = readFileStrSync(testMode ? "./input-sample.txt" : "./input.txt", {
  encoding: "utf8",
})
  .split("\n")
  .map(parseLine);


function secondsItTakesToCompleteStep(step:string):number {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
  const base = testMode ? 0 : 60;
  return base + alphabet.indexOf(step) + 1;
}

function buildReport(tuples: string[][]) {
  const finishedSteps: string[] = [];
  const outcome: { [youWorkOn:string]:string  } = [];
  const copiedTuples = [...tuples];

  const requirementLog: RequirementLog = copiedTuples.reduce(
    (acc: RequirementLog, curr) => {
      acc.hasOwnProperty(curr[1])
        ? acc[curr[1]].push(curr[0])
        : (acc[curr[1]] = [curr[0]]);
      return acc;
    },
    {}
  ); 

  const allSteps = [...new Set(Object.entries(requirementLog).flat(7))]; //would prefer flat(infinity) but TS is capped at 7. https://github.com/microsoft/TypeScript/blob/7cc4a8df9482ffdfa6b3500a009c0454681d5f4b/src/lib/es2019.array.d.ts#L132-L138

  function dependenciesHaveBeenMet(step: string): boolean {
    debugger;
    if (!requirementLog.hasOwnProperty(step)) return true;
    return requirementLog[step].every((dependant) =>
      finishedSteps.includes(dependant)
    );
  }


  // return outcome.join("");
}

const output = buildReport(input);
console.log("output: ", output);

function parseLine(line: string) {
  return [line[5], line[36]];
}

type RequirementLog = { [dependency: string]: string[] };
interface raportBySecond {
  second: number,
  workers: string[][],
 
}

console.timeEnd("runtime"); //3ms
