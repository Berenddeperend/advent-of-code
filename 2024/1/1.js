const file = Bun.file('./1.txt');
const input = await file.text()

const sanitizedInput = input.split('\n').filter(d => !!d).map((line) => line.split('   '));
const listA = sanitizedInput.map(d => parseInt(d[0])).sort()
const listB = sanitizedInput.map(d => parseInt(d[1])).sort()

const day1 = listA.reduce((acc, curr, index) => {
  return acc + Math.abs(curr - listB[index])
}, 0)

const day2 = listA.reduce((accA, currA) => {
  const similarityScore = listB.reduce((accB, currB) => {
    return currA === currB ? accB + currB : accB;
  }, 0)

  return accA + similarityScore;
}, 0)

console.log(day1)
console.log(day2)





