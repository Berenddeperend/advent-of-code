console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./8/input.txt", "utf8").split("\n");

function work(
  instruction: string[],
  line: number,
  accumulator: number,
  stepsPerformed: number[]
) {
  if (stepsPerformed.includes(line)) return 0;
  stepsPerformed.push(line); 

  if (line >= instruction.length || line < 0) return accumulator;

  const [operation, value] = instruction[line].split(" ");

  switch (operation) {
    case "nop":
      return work(instruction, line + 1, accumulator, stepsPerformed);
    case "acc":
      return work(
        instruction,
        line + 1,
        accumulator + parseInt(value),
        stepsPerformed
      );
    case "jmp":
      return work(
        instruction,
        line + parseInt(value),
        accumulator,
        stepsPerformed
      );
  }
}

const answer = input.reduce((answer, instruction, instructionIndex) => {
  let modifiedInstructionList = [...input];
  const [operation, value] = modifiedInstructionList[instructionIndex].split(
    " "
  );
  switch (operation) {
    case "nop":
      modifiedInstructionList[instructionIndex] = "jmp " + value;
      return answer + work(modifiedInstructionList, 0, 0, []);
    case "acc":
      return answer;
    case "jmp":
      modifiedInstructionList[instructionIndex] = "nop " + value;
      return answer + work(modifiedInstructionList, 0, 0, []);
  }
}, 0);

console.log(answer);

console.timeEnd("runtime");
