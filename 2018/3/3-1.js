const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split("\n");

const parsedInput = input.map(item => {
  const elements = item.split(" ");
  const from = elements[2].split(",");
  
  return {
    x: Number(from[0]),
    y: Number(from[1].substring(0, from[1].length -1)),
    width: Number(elements[3].split("x")[0]),
    height: Number(elements[3].split("x")[1]),
  };
});

const gridOccurences = parsedInput.reduce((acc, curr) => {
  for(let x = 0; x < curr.width; x++) {
    for(let y = 0; y < curr.height; y++) {
      let key = `${x + curr.x}x${y + curr.y}`;
      acc.hasOwnProperty(key) ? acc[key]++ : acc[key] = 1;
    }
  }
  
  return acc;
}, {});

console.log(Object.values(gridOccurences).filter(i => i > 1).length);