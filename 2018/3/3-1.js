const fs = require('fs');
const input = fs.readFileSync('./input2.txt', 'utf8').split("\n");

const parsedInput = input.map(item => {
  const elements = item.split(" ");
  const from = elements[2].split(",");
  
  return {
    id: Number(elements[0].substring(1)),
    x: Number(from[0]),
    y: Number(from[1].substring(0, from[1].length -1)),
    width: Number(elements[3].split("x")[0]),
    height: Number(elements[3].split("x")[1]),
  };
});

parsedInput.forEach((claim) => {
  
})
console.log('parsedInput: ', parsedInput);