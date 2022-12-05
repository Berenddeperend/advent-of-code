console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2022/4/input.txt", 'utf8').split('\n');

const getRange = (pair) => pair[1] - pair[0]

function pairsWithOverlap(pairs) {
    const sortedPairs = pairs.sort((a,b)=>getRange(a) - getRange(b));
    const [pairA, pairB] = sortedPairs;
    
    const fits = pairA[1] >= pairB[0] && pairA[0] <= pairB[1];

    return fits;
}

const answer = input
    .map(pairs => pairs.split(',').map(pair => pair.split('-').map(Number)))
    .filter(pairsWithOverlap)
    .length;

console.log(answer)

console.timeEnd("runtime");