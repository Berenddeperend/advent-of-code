console.time('runtime');

const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split("\n");

const parsedInput = input.map(entry => {
  const timestamp = entry.split("]")[0].split("[")[1];
  const [date, time] = timestamp.split(" ");
  const minuteStamp = Number(timestamp.split(" ")[1].split(":")[1])
  const [year, month, day] = date.split("-").map(string => Number(string));
  const log = entry.split("]")[1].trim();

  return { year, month, day, log, timestamp, minuteStamp}
}).sort((a, b) => {
  return ('' + a.timestamp).localeCompare(b.timestamp);
});
 
// console.log('parsedInput: ', parsedInput);

const guards = [...new Set(parsedInput
  .filter(entry => entry.log.startsWith("Guard"))
  .map(entry => entry.log.split(" ")[1]))];

// console.log('guards: ', guards);
  
const guardLog = guards.reduce((log, guard) => {
  log[guard] = buildSleepMinuteLog(guard) 
  return log;
}, {});
  
console.log('guardLog: ', guardLog);

function buildSleepMinuteLog(guard) {
  let guardOnDuty = false;
  let awake = false;
  let fellAsleepAt = null;

  return parsedInput.reduce((log, entry) => {
    if(entry.log === `Guard ${guard} begins shift`) {
      guardOnDuty = true;
    } else if (entry.log === "falls asleep") {
      if(guardOnDuty) {
        awake = false;
        fellAsleepAt = entry.minuteStamp;
      }
    } else if (entry.log === "wakes up") {
      if(guardOnDuty) {

        // console.log(`guard ${guard} fell asleep at ${fellAsleepAt} and woke up at ${entry.minuteStamp}`)

        for (i = fellAsleepAt; i < entry.minuteStamp; i++) {
          log[i] === undefined ? log[i] = 1 : log[i]++;
        }

        fellAsleepAt = null;
        awake = true;
      }
    } else { //other guard begins
      guardOnDuty = false;
    }
    return log;
  }, {})
};


function getSleepiestGuard() { //Deze gaat fout
  function totalMinutesAsleep(log) { //deze is goed
    return Object.values(log).reduce((acc, curr) => acc + curr, 0)
  }  
  
  return guards.reduce((sleepiestSoFar, guard) => {
    if(sleepiestSoFar === null) {
      sleepiestSoFar = guard;
      return sleepiestSoFar;
    }

    if(totalMinutesAsleep(guardLog[guard]) > totalMinutesAsleep(guardLog[sleepiestSoFar])) {
      return sleepiestSoFar = guard;
    } 
    return sleepiestSoFar;
  }, null); 
}


function multiplyIdWithTargetMinute(guard) { //works as intended
  function mostAsleepAtMinute(log) {
    return Object.keys(log).reduce((sleepiestMinute, currentMinute) => {
      if(sleepiestMinute === null) {
        sleepiestMinute = currentMinute;
      } else {
        if (log[currentMinute] > log[sleepiestMinute]) {
          sleepiestMinute = currentMinute;
        }
      }
      return sleepiestMinute;
    }, null);
  }

  return parseInt(guard.split("#")[1]) * parseInt(mostAsleepAtMinute(guardLog[guard]));
}

const answer = multiplyIdWithTargetMinute(getSleepiestGuard());

console.timeEnd('runtime') 