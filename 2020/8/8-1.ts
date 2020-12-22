console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./8/input.txt", "utf8").split("\n");

let accumulator = 0;

let stepsPerformed = [];

function work(instruction: string[], line: number) {
  if (stepsPerformed.includes(line)) return;
  stepsPerformed.push(line)

  const [operation, value] = instruction[line].split(' ');
  console.log('operation, value: ', operation, value);

  switch (operation) {
    case 'nop':
      work(instruction, line + 1)
      break;
    case 'acc':
      accumulator += parseInt(value); 
      work(instruction, line + 1)
      break;
    case 'jmp': 
      work(instruction, line + parseInt(value))
  }
}

work(input, 0)

console.log(accumulator)

console.timeEnd("runtime");
