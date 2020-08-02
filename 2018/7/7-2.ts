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

function buildOrderString(tuples: string[][]) {
  const outcome: string[] = [];
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

  const dependants = [...new Set(Object.values(requirementLog).flat())];
  const dependencies = [...new Set(Object.keys(requirementLog).flat())];
  const allSteps = [...new Set([...dependencies, ...dependants])];

  function dependenciesHaveBeenMet(step: string): boolean {
    debugger;
    if (!requirementLog.hasOwnProperty(step)) return true;
    return requirementLog[step].every((dependant) =>
      outcome.includes(dependant)
    );
  }

  while (outcome.length < allSteps.length) {
    outcome.push(
      allSteps
        .filter((step) => !outcome.includes(step)) //only steps that haven't been placed
        .filter(dependenciesHaveBeenMet) //and steps who no longer have dependencies
        .sort()[0] //if still multiple left, pick the first one alphabetically
    );
  }

  return outcome.join("");
}

const output = buildOrderString(input);
console.log("output: ", output);

function parseLine(line: string) {
  return [line[5], line[36]];
}

type RequirementLog = { [dependency: string]: string[] };

console.timeEnd("runtime"); //3ms
