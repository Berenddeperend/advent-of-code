console.time('runtime');

const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split("\n");

const parsedInput = input.map(item => {
  const elements = item.split(" ");
  const from = elements[2].split(",");
  
  return {
    id: elements[0],
    x: Number(from[0]),
    y: Number(from[1].substring(0, from[1].length -1)),
    width: Number(elements[3].split("x")[0]),
    height: Number(elements[3].split("x")[1]),
  };
});

// console.log('parsedInput: ', parsedInput);

const gridOccurences = parsedInput.reduce((acc, curr, i, src) => {
  for(let x = 0; x < curr.width; x++) {
    for(let y = 0; y < curr.height; y++) {
      let key = `${x + curr.x}x${y + curr.y}`;
      if(acc.hasOwnProperty(key)) {
        acc[key].push(curr.id);
      }
      else {
        acc[key] = [curr.id];
      }
    }
  }
  return acc;
}, {});

// console.log('gridOccurences: ', gridOccurences);

const winner = parsedInput.find(input => {
  //for every input, return if it d
  let occursInSharedSpace = true;
  
  Object.values(gridOccurences).forEach(pixel => {
    if(pixel.length > 1 && pixel.includes(input.id)) {
      occursInSharedSpace = false;
    }
  })
  
  return occursInSharedSpace;
})


console.log('winner: ', winner);
console.timeEnd('runtime')

//#1019, 266958.897ms