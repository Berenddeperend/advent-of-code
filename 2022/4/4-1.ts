console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2022/4/input.txt", 'utf8').split('\n');

const getRange = (pair) => pair[1] - pair[0]

function pairsFitInEachOther(pairs) {
    const sortedPairs = pairs.sort((a,b)=>getRange(b) - getRange(a));
    const fits = sortedPairs[0][0] <= sortedPairs[1][0] && sortedPairs[0][1] >= sortedPairs[1][1];
    return fits;
}

const answer = input
    .map(pairs => pairs.split(',').map(pair => pair.split('-').map(Number)))
    .filter(pairsFitInEachOther)
    .length;

console.log(answer)

console.timeEnd("runtime");