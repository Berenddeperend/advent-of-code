console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const testMode = !!Deno.args.length;

const input = readFileStrSync(testMode ? "./input-sample.txt" : "./input.txt", {
  encoding: "utf8",
})
  .split("\n")
  .map(parseLine);

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

  const allSteps = [...new Set(Object.entries(requirementLog).flat(2))]; //would prefer flat(infinity) but TS is capped at 7. https://github.com/microsoft/TypeScript/blob/7cc4a8df9482ffdfa6b3500a009c0454681d5f4b/src/lib/es2019.array.d.ts#L132-L138

  function dependenciesHaveBeenMet(step: string): boolean {
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
