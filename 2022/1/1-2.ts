console.time("runtime");
import { readFileSync } from 'fs';

const rawInput = readFileSync("./2022/1/input.txt", 'utf8');
const elvesInventory = rawInput.split('\n\n').map(group => group.split('\n').map(Number));

const addTotal = (acc, curr) => acc + curr;

const totals = elvesInventory.map(elf => elf.reduce(addTotal)).sort((a,b)=> b - a);
const total = totals.slice(0,3).reduce(addTotal);

console.log(total);

console.timeEnd("runtime");   