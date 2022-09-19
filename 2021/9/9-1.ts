console.time("runtime");
import { readFileSync } from 'fs';

const rawInput = readFileSync("./2021/9/input.txt", 'utf8');
const rows = rawInput.split('\n');
const input = rows
    .join('')
    .split('')
    .map(d => parseInt(d));

const rowLength = rows[0].length;

function getNeighboursFromIndex(index: number): (number | undefined)[] {
    const left = index % rowLength === 0 ? undefined : input[index -1];
    const right = (index + 1) % rowLength === 0  ? undefined : input[index +1];
    const top = index < rowLength ? undefined : input[index - rowLength];
    const bottom = index >= input.length - rowLength ? undefined : input[index + rowLength];
    
    return [input[index], top, right, bottom, left];
}


const answer = input
    .map((d, i) => getNeighboursFromIndex(i))
    .map(a => a.filter(d => d !== undefined))
    .filter((d) => {
        const copied = [...d];
        const first = copied.shift();
        return copied.every(d => d > first);
    })
    .map(d => d[0])
    .reduce((acc, curr) => acc + curr +1, 0);

console.log(answer)

console.timeEnd("runtime");

