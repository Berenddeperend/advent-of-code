const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split("\n");


const raports = input.reduce((raport, string) => {
  const letters = string.split("");
  const occurences = letters.reduce((total, letter) => {
    if(total[letter] === undefined) {
      total[letter] = 1;
    } else {
      total[letter]++;
    }
    return total;
  }, {});

  raport[string] = occurences;

  return raport;
}, {})


const multiples = Object.values(raports).reduce((total, raport) => {
  if (Object.values(raport).includes(2)) {
    total.doubles ++
  }

  if (Object.values(raport).includes(3)) {
    total.triples ++
  }

  return total;
}, {
  doubles: 0,
  triples: 0
})

const checksum = multiples.doubles * multiples.triples;
console.log('checksum: ', checksum);

// raports:  {
//   abcdef: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 },
//   bababc: { b: 3, a: 2, c: 1 },
//   abbcde: { a: 1, b: 2, c: 1, d: 1, e: 1 },
//   abcccd: { a: 1, b: 1, c: 3, d: 1 },
//   aabcdd: { a: 2, b: 1, c: 1, d: 2 },
//   abcdee: { a: 1, b: 1, c: 1, d: 1, e: 2 },
//   ababab: { a: 3, b: 3 }
// }