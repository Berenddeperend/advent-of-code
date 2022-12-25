console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2022/5/input.txt", 'utf8').split('\n');


const startState = [[],[],[]];
const instructions = [];

const last = (stack: string[]) => stack[stack.length-1];

const move = (count: number, from: number, to: number) => {
    for(let i = 0; i < count; i++) {
        stacks[to].push(stacks[from].pop())
    }
};

const isLetter = (string: string): boolean => {
    return (/[a-z]/i).test(string); 
};

function chunkString (str, len) { //stolen from StackOverflow
    const size = Math.ceil(str.length/len)
    const r = Array(size)
    let offset = 0
    
    for (let i = 0; i < size; i++) {
      r[i] = str.substr(offset, len)
      offset += len
    }
    
    return r
  }

let stacks: {} = {}

input.forEach(row => {
    if (row.includes('[')) {
        chunkString(row, 4)
            .forEach((part, i) => {
                if(part[1] === " ") return;
                if(stacks[i]) {
                    stacks[i].push(part[1])
                } else {
                    stacks[i] = [part[1]]
                }
            })
    }

    if(row.startsWith('move')) {
        instructions.push(row);
    }
})

Object.values(stacks).map(stack => (stack as string[]).reverse());
console.log(stacks);


instructions.forEach(instruction => {
    const parsedInstruction: number[] = instruction
        .split(' ')
        .filter(part => !isLetter(part))
        .map(Number);

    //blegh spread doesnt work
    move(parsedInstruction[0], parsedInstruction[1] -1, parsedInstruction[2] -1); 
});


console.log(Object.values(stacks).map(last).join(''))

console.timeEnd("runtime");