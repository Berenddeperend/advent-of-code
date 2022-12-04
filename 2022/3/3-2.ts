console.time("runtime");
import { readFileSync } from 'fs';

const input:string[] = readFileSync("./2022/3/input.txt", 'utf8').split('\n');

const scoreChart = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chunkSize = 3

function chunk(input, size) {
    return input.reduce((acc, curr, i) => {
        const chunkIndex = i % size;
        chunkIndex === 0 ?  acc.push([curr]) : acc[acc.length -1].push(curr);
        return acc;
    }, [])
}

function getScoreForGroup(bags: string[]) {
    const uniqueItemsInBags = bags.map(bag => Array.from(new Set(bag.split(''))));
    const itemMappings = uniqueItemsInBags.flat().reduce((acc, curr) => {
        curr in acc ? acc[curr]++ : acc[curr] = 1;
        return acc;
    }, {});
    const badgeItem = Object.entries(itemMappings).find(entry => entry[1] === 3)[0];

    return scoreChart.indexOf(badgeItem) + 1;
}

// function divideIntoGroupsOfThree(input) {
    // return chunk(input, 3);
    // };
    
// it would be cool to have this chainable. Is that what currying is for?
const answer = chunk(input, chunkSize)
    .map(getScoreForGroup)
    .reduce((a, c) => a + c, 0);

console.log(answer)

console.timeEnd("runtime");