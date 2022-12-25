console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2022/6/input.txt", 'utf8');


const len = 14

const answer = input.split('').findIndex((item, index, arr) => {
    return [...new Set(arr.slice(index, index + len))].length === len
})

console.log(answer + len)

console.timeEnd("runtime");