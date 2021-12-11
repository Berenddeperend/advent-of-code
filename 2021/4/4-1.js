console.time("runtime");
const fs = require("fs");
const input = fs.readFileSync("./input-sample.txt", "utf8");

const drawnNumbers = input
  .split("\n")[0]
  .split(",")
  .map((d) => parseInt(d));
const bingoCards = input
  .split("\n\n")
  .filter((d, i) => i > 0)
  .map((d) => d.split("\n"))
  .map((d) => d.map((j) => j.match(/\d+/gm).map((d) => parseInt(d))));

console.log("bingoCards: ", bingoCards);

console.timeEnd("runtime");
