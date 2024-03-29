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

const score = drawnNumbers.reduce((acc, curr, i) => {
  if (acc) return acc;

  const bingoIndex = bingoCards.findIndex((card) =>
    isBingo(card, drawnNumbers.slice(0, i + 1))
  );

  if (bingoIndex !== -1) {
    acc =
      bingoCards[bingoIndex]
        .flat()
        .filter((d) => !drawnNumbers.slice(0, i + 1).includes(d))
        .reduce((a, c) => a + c, 0) * curr;
  }

  return acc;
}, null);

console.log(score)

console.timeEnd("runtime");
