console.time("runtime");
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const drawnNumbers = input
  .split("\n")[0]
  .split(",")
  .map((d) => parseInt(d));
const bingoCards = input
  .split("\n\n")
  .filter((d, i) => i > 0)
  .map((d) => d.split("\n"))
  .map((d) => d.map((j) => j.match(/\d+/gm).map((d) => parseInt(d))));

function isBingo(card, numbers) {
  const cardSize = card[0].length;

  const verticalMatch = card[0]
    .map((headerCell, colIndex) => {
      let bingo = true;
      for (let i = 0; i < cardSize; i++) {
        const stillGoing = numbers.includes(card[i][colIndex]);
        if (!stillGoing) bingo = false;
      }
      return bingo;
    })
    .some((d) => d);

  const horizontalMatch = card.some((row) =>
    row.every((cell) => numbers.includes(cell))
  );

  return verticalMatch || horizontalMatch;
}

// find losing card. 
// const losingCard = bingoCards.reduce((bingoedCards, card, cardIndex) => {
//   if(bingoedCards.length === bingoCards.length) return bingoedCards;

//   drawnNumbers.map((drawnNumber, drawnNumberIndex) => {
//     return 
//   })

// },[])


const losingCardIndex = drawnNumbers.reduce((bingoedCards, drawnNumber, drawnNumberIndex) => {
  if(bingoedCards.length === bingoCards.length) return bingoedCards;
  
  bingoCards.map((bingoCard, bingoCardIndex) => {
    if(bingoedCards.includes(bingoCardIndex)) return;
    if(isBingo(bingoCard, drawnNumbers.slice(0, drawnNumberIndex + 1))) {
      bingoedCards.push(bingoCardIndex)
    }
  })

  return bingoedCards;

}, [])[bingoCards.length -1]


const score = drawnNumbers.reduce((acc, curr, i) => {
  if (acc) return acc;

  if(isBingo(bingoCards[losingCardIndex], drawnNumbers.slice(0, i+1))) {
    
    return acc =
      bingoCards[losingCardIndex]
        .flat()
        .filter((d) => !drawnNumbers.slice(0, i + 1).includes(d))
        .reduce((a, c) => a + c, 0) * curr;
  }

}, null);

console.log(score);

console.timeEnd("runtime");
