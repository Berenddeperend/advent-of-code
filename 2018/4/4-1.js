console.time('runtime');

const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split("\n");

const parsedInput = input.map(entry => {
  const timestamp = entry.split("]")[0].split("[")[1];
  const date = timestamp.split(" ")[0];
  const [year, month, day] = date.split("-").map(string => Number(string));
  const log = entry.split("]")[1].trim();

  return {
    year,
    month,
    day,
    log,
    stupidDate: stupidAdd([year, month, day])
  }
}).sort((a, b) => {
  return stupidAdd([a.year, a.month, a.day]) - stupidAdd([b.year, b.month, b.day]);
});
 
const guards = [...new Set(parsedInput
  .filter(entry => entry.log.includes("Guard"))
  .map(entry => entry.log.split("#")[1].split(" ")[0])
  .map(string => Number(string)))];

console.log('guards: ', guards);


function stupidAdd(numbers){
  return Number(numbers.map(number => String(number)).join(""))
}

console.timeEnd('runtime') 