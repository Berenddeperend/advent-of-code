const fs = require('fs');
const input = 
  fs.readFileSync("./1/input.txt", "utf8")
    .split('\n')
    .filter(string => !isNaN(parseInt(string)))
    .map(string => parseInt(string));

let occurences = {};
let value = 0;
let i = 0;

do {
  value += input[i];
  occurences[value] === undefined ? occurences[value] = 1 : occurences[value]++
  i === input.length - 1 ? i = 0 : i++;
}
while(noDuplicates(value))

console.log('gottem:', value)

function noDuplicates(value) {
  return occurences[value] < 2;
}










// let occurences = {};
// let value = 0;
// let loopCount = 0;

// let latest = null;

// function loop() {
//   input.map((computation) => {
//     value += computation;
//     if(occurences[value] == undefined) {
//       occurences[value] = 1;
//     } else {
//       occurences[value] = occurences[value] + 1;
//       console.log('gottem', value)
//     }
//   })
// }

// loop();

// while(noDuplicates(value)) {
//   loopCount++;
//   loop();
// }

// function noDuplicates(value) {
//   return occurences[value] < 2;
// }