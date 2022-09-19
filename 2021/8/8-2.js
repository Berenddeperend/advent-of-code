console.time("runtime");
const fs = require("fs");
let input = fs
    .readFileSync("./input-sample.txt", "utf8")
    .split("\n")
    .map((d) => d.split(" | "));

//  testvalues | output values


const table = {
    1: 2,
    2: 5,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 7,
    9: 6,
    0: 6,
};
const segmentCounts = Object.values(table).reduce((acc, curr) => {
    acc.hasOwnProperty(curr) ? acc[curr]++ : (acc[curr] = 1);
    return acc;
}, {});

const uniqueChars = Object.entries(table).filter((entry) => {
    const [key, value] = entry;
    return segmentCounts[value] === 1;
});

const segments = [
    'abcefg',
    'cf',
    'acdeg',
    'acdfg',
    'bcdf',
    'abdfg',
    'abdefg',
    'acf',
    'abcdefg',
    'abcdg'
]

function createStringTable(strings) {
    return strings.reduce((acc, curr) => {
        curr.split('').map((letter) => {
            acc[letter] ? acc[letter]++ : acc[letter] = 1;
        })
        return acc;
    }, {});
}

function intersectString(...strings) {  // ab bc bd => b
    const table = createStringTable(strings);
    return Object.entries(table).filter(d => d[1] === strings.length).map(d => d[0]).join('')
}

const intersect = intersectString('ab', 'bc');
console.log(intersect)

function subtractString(...strings) { //ab bc => ac
    const table = createStringTable(strings);
    return Object.entries(table).filter(d => d[1] === 1).map(d => d[0]).join('')
}

const subtract = subtractString('ab', 'bc')
console.log(subtract)

// function unionString(){}

// function xorString(a, b) {
// }

// function isSegmentA(scrambledSegments) {
//   const letter1 = scrambledSegments.find(d => d.length === 2)
//   const letter7 = scrambledSegments.find(d => d.length === 3)
//   const segmentA = letter7.split('').find(seg => !letter1.split('').includes(seg));
//   return segmentA
// }

// function isSegmentC(scrambledSegments) {
//   const letter4 = scrambledSegments.find(d => d.length === 4);
//   const segEandC = scrambledSegments.find(d => d.length === 6);
// }

// console.log("uniqueChars: ", uniqueChars);

// console.log(input)

// const segmentA = isSegmentA(input)
// console.log('segmentA: ', segmentA);

console.timeEnd("runtime");
