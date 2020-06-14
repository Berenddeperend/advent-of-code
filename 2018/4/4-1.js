console.time('runtime');

const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split("\n");

const parsedInput = input.map(entry => {
  const timestamp = entry.split("]")[0].split("[")[1];
  const [date, time] = timestamp.split(" ");
  const minuteStamp = Number(timestamp.split(" ")[1].split(":")[1])
  const [year, month, day] = date.split("-").map(string => Number(string));
  const log = entry.split("]")[1].trim();

  return {
    year,
    month,
    day,
    log,
    // time,
    minuteStamp,
    stupidDate: stupidAdd([year, month, day])
  }
}).sort((a, b) => {
  return stupidAdd([a.year, a.month, a.day]) - stupidAdd([b.year, b.month, b.day]);
});
 
// console.log('parsedInput: ', parsedInput);

const guards = [...new Set(parsedInput
  .filter(entry => entry.log.startsWith("Guard"))
  .map(entry => entry.log.split(" ")[1]))];

  // console.log('guards: ', guards);
  

  
const guardLog = guards.reduce((log, guard) => {
  log[guard] = {
    minutesAsleep: getMinutesAsleep(guard)
  }
  return log;
}, {});
  
console.log('guardLog: ', guardLog);


function getMinutesAsleep(guard) {
  let guardOnDuty = false;
  let awake = false;
  let fellAsleepAt = null;

  return parsedInput.reduce((minutes, entry) => {
    if(entry.log === `Guard ${guard} begins shift`) {
      guardOnDuty = true;
    } else if (entry.log === "falls asleep") {
      if(guardOnDuty) {
        awake = false;
        fellAsleepAt = entry.minuteStamp;
      }
    } else if (entry.log === "wakes up") {
      if(guardOnDuty) {
        minutes += entry.minuteStamp - fellAsleepAt -1;
        fellAsleepAt = null;
        awake = true;
      }
    } else { //other guard begins
      guardOnDuty = false;
    }
    return minutes;
  }, 0)
};

const sleepiestGuard = guards.reduce((sleepiestSoFar, guard) => {
  if(sleepiestSoFar === null) return sleepiestSoFar = guard;
  if(guardLog[guard].minutesAsleep > guardLog[sleepiestSoFar].minutesAsleep) {
    return sleepiestSoFar = guard;
  } 
  return sleepiestSoFar;
}, null);


function getSleepMinuteIndex(guard) {
  let output = {}

  function guardIsAsleepAtMinute(guard, minute) {
    
  }

  for(let i = 0; i < 60; i ++) {

  }
}
console.log(getSleepMinuteIndex(sleepiestGuard));


function stupidAdd(numbers){
  return Number(numbers.map(number => String(number)).join(""))
}

console.timeEnd('runtime') 