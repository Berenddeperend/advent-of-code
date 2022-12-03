console.time("runtime");
import { readFileSync } from 'fs';

const rawInput = readFileSync("./2022/2/input.txt", 'utf8');

const opponentOptions = ['A', 'B', 'C'];
const options = ['X', 'Y', 'Z'];


function earnedPointsForRound(input: string[]): number {
    const [opponentHand, targetOutcome] = input;
    const opponentHandIndex =  opponentOptions.indexOf(opponentHand);

    const winScore = options.indexOf(targetOutcome) * 3;

    function modulo(n, m) { //because apparently javascript has a bug with negative modulos. TIL.
        return ((n % m) + m) % m;
    }

    function getTargetHandScore(): number {
        switch(targetOutcome) {
            case 'X': //lose
                return modulo(opponentHandIndex - 1, options.length) + 1
            case 'Y': //tie
                return opponentHandIndex + 1
            case 'Z': //win
                return modulo(opponentHandIndex + 1, options.length) + 1
        }
    }
    
    const score = getTargetHandScore() + winScore;

    return score;
}

const output = rawInput
    .split('\n')
    .reduce((acc, curr) => {
        return acc + earnedPointsForRound(curr.split(' ')) 
    }, 0)

console.log(output)

console.timeEnd("runtime");