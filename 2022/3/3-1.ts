console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2022/3/input.txt", 'utf8').split('\n');

const scoreChart = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getScoreForBag(bag: string): number {
    const compartimentA = bag.substring(0, bag.length / 2);
    const compartimentB = bag.substring(bag.length / 2, bag.length);

    const duplicateItem = compartimentA.split('').find((itemInA) => compartimentB.includes(itemInA));

    return scoreChart.indexOf(duplicateItem) + 1;
}

const answer = input.map(getScoreForBag).reduce((a, c) => a + c, 0);

console.log(answer)

console.timeEnd("runtime");