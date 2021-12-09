console.time("runtime");
const fs = require('fs');
const input = fs.readFileSync("./input.txt", 'utf8').split("\n");

const report = input.reduce((acc, curr, i) => {
    curr.split("").map(d => parseInt(d)).map((d, dI) => {
        if(d === 1) {
            acc.length > dI ? acc[dI]++ : acc.push(1)
        }
        else {
            if(acc.length <= dI) {acc.push(0)} 
        }
    });

    return acc;
}, []) //save the 'one's 

const gamma = parseInt(report.map(d => d < input.length / 2 ? 0 : 1).join(""), 2);
const epsilon = parseInt(report.map(d => d < input.length / 2 ? 1 : 0).join(""), 2);


console.log('gamma: ', gamma);
console.log('epsilon: ', epsilon);

const answer = gamma * epsilon
console.log('answer: ', answer);
// console.log(report)

console.timeEnd("runtime");