const test = true;
const numPlayers = test ? 9 : 476;
const lastMarble = test ? 25 : 71431;

let currentMarbleIndex = 0;
let currentMarbleValue = 0;
let circle: number[] = [0];

for(let playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
  currentMarbleValue++;
  currentMarbleIndex = (currentMarbleIndex + 2) % (circle.length + 1);
  circle.splice(currentMarbleIndex, 0, currentMarbleValue);
  console.log(currentMarbleValue, currentMarbleIndex, circle.join('')); 
}

