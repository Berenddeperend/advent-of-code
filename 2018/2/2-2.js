const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split("\n");

const closestMatch = input.reduce((closest, string) => {
  const others = input.filter(a => a !== string);

  others.forEach(other => {
    const diff = differentLetterCount(other, string);
    if ( diff < closest.diff) {
      closest = {
        a: string,
        b: other,
        diff
      }
    }
  })
 
  return closest;
}, {
  a: null,
  b: null,
  diff: Infinity
}
);

console.log(commonLetters(closestMatch.a, closestMatch.b))

function differentLetterCount(stringA, stringB) {
  return stringA.split("").reduce((count, letterA, i) => {
    if (letterA !== stringB[i]) count++;
    return count;
  }, 0);
}

function commonLetters(stringA, stringB) {
  return stringA.split("").reduce((commonLetters, letter, i) => {
    if(letter === stringB[i]) {
      commonLetters.push(letter);
    }
    return commonLetters
  }, []).join("");
}


// raports:  {
//   abcdef: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 },
//   bababc: { b: 3, a: 2, c: 1 },
//   abbcde: { a: 1, b: 2, c: 1, d: 1, e: 1 },
//   abcccd: { a: 1, b: 1, c: 3, d: 1 },
//   aabcdd: { a: 2, b: 1, c: 1, d: 2 },
//   abcdee: { a: 1, b: 1, c: 1, d: 1, e: 2 },
//   ababab: { a: 3, b: 3 }
// }