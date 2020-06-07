const fs = require('fs');
const input = fs.readFileSync("./1/input.txt", "utf8").split('\n');
const output = input.reduce((acc, curr) => {
  if(isNaN(parseInt(curr))) {
    return acc
  }
  return acc + parseInt(curr);
}, 0); 



console.log('output: ', output);  