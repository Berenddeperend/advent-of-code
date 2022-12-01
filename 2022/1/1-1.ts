console.time("runtime");
import { readFileSync } from 'fs';

const rawInput = readFileSync("./2022/1/input.txt", 'utf8');
const elvesInventory = rawInput.split('\n\n').map(group => group.split('\n').map(item => Number(item)));

const addTotal = (acc, curr) => acc + curr;

console.log(Math.max(...elvesInventory.map(elfTotal => elfTotal.reduce(addTotal))))

console.timeEnd("runtime");