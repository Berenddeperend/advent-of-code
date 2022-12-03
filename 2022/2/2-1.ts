console.time("runtime");
import { readFileSync } from 'fs';

const rawInput = readFileSync("./2022/2/input.txt", 'utf8');

const opponentOptions = ['A', 'B', 'C'];
const options = ['X', 'Y', 'Z'];


function earnedPointsForRound(input: string[]): number {
    const [opponentHand, hand] = input;
    const opponentHandIndex =  opponentOptions.indexOf(opponentHand);
    const handIndex = options.indexOf(hand);
    const handScore = options.indexOf(hand) + 1;

    function getPointsForWinning(): number {
        if (handIndex === opponentHandIndex) return 3;
        if ((handIndex + 1) % options.length === opponentHandIndex) return 0;
        return 6;
    }

    return handScore + getPointsForWinning();
}

const output = rawInput
    .split('\n')
    .reduce((acc, curr) => {
        return acc + earnedPointsForRound(curr.split(' ')) 
    }, 0)

console.log(output)


console.timeEnd("runtime");