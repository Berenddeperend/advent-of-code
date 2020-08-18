console.time("runtime");
import { readFileStrSync } from "https://deno.land/std@0.60.0/fs/read_file_str.ts";

const testMode = !!Deno.args.length;

const input = readFileStrSync(testMode ? "./input-sample.txt" : "./input.txt", {
  encoding: "utf8",
})
  .split("\n")
  .map(parseLine);

const numWorkers:number = testMode ? 2 : 5; 

function buildReport(tuples: string[][]) {
  const report:(string|null)[][] = []; //todo: iets beter uitschrijven wat dit moet worden.
  const copiedTuples = [...tuples];

  let i:number = 0;
  const workers: (string|null)[] = Array(numWorkers).fill(null);
  const stepsDone:string[] = [];

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


  while (stepsDone.length < allSteps.length) {
    //first, check if the workers are done with their task.
    debugger;
    for (let i = 0; i < workers.length; i++) {
      if (workers[i]) { //current worker is busy
        const secondsNeededForCompletion = secondsItTakesToCompleteStep((workers[i] as string));
        const taskIsFinished = () => {
          if(!report[report.length - secondsNeededForCompletion]) return false; //short-circiut if there are not enough entries in raport to be able to finish
          return report[report.length - secondsNeededForCompletion].includes(workers[i])
        }

        if (taskIsFinished()) {
          stepsDone.push((workers[i] as string));
          workers[i] = null;
        } else {
        }
      }
    }

    // now, check to see if we can put any of the workers to use again.
    let nextToPickUp = allSteps
    .filter(notDoneYet) //only steps that haven't been placed
    .filter(notPickedUpYet)
    .filter(dependenciesHaveBeenMet)
    .sort()
    
    for (let i = 0; i < nextToPickUp.length; i++) {
      setWorkerToTask(nextToPickUp[i])
    }

    report.push([...workers]);
  }

  function dependenciesHaveBeenMet(step: string): boolean {
    if (!requirementLog.hasOwnProperty(step)) return true; //has no dependencies, so dependencies have been met.
    return requirementLog[step].every((dependency) =>
      stepsDone.includes(dependency)
    );
  }

  function notDoneYet(step: string): boolean {
    return !stepsDone.includes(step);
  }

  function notPickedUpYet(step: string): boolean {
    return !workers.includes(step);
  }
  
  function setWorkerToTask(task: string):void {
    for (let i = 0; i < workers.length; i++) {
      if(!workers[i]) { //worker is free
        workers[i] = task;
        return;
      } 
    }
  }

  function secondsItTakesToCompleteStep(step:string):number {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    const base = testMode ? 0 : 60;
    return base + alphabet.indexOf(step) + 1;
  }

  return report;
}

const output = buildReport(input);
console.log("output: ", output.length -1);

function parseLine(line: string) {
  return [line[5], line[36]];
}

type RequirementLog = { [dependant: string]: string[] }; // {dependant: [dependency, dependency]}

console.timeEnd("runtime"); //3ms
