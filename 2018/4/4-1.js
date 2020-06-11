console.time('runtime');

const fs = require('fs');
const input = fs.readFileSync('./input2.txt', 'utf8').split("\n");

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

const guardLog = guards.reduce((log, guard) => {
  log['#' +guard] = { 
    // minutesAsleep: 
  }
  return log;
}, {});

console.log('guardLog: ', guardLog);


function stupidAdd(numbers){
  return Number(numbers.map(number => String(number)).join(""))
}

console.timeEnd('runtime') 