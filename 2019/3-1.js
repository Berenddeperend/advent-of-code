const fs = require('fs');

const input = fs.readFileSync("./3-input.txt", 'utf8').split("\n").filter(d => d.length)
// const input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83`.split("\n").filter(d => d.length);


const path1 = input[0].split(",")
const path2 = input[1].split(",")
 

function moveToPosition(startPoint, instruction) {
    const direction = instruction[0];
    const ammount = parseInt(instruction.substring(1));
    const newPoints = [];

    const x = parseInt(startPoint.split(":")[0])
    const y = parseInt(startPoint.split(":")[1])

    for(let i = 1; i < ammount + 1; i++) {
      switch(direction) {
        case "L": newPoints.push(`${x - i}:${y}`); break;
        case "R": newPoints.push(`${x+ i}:${y}`); break;
        case "U": newPoints.push(`${x}:${y + i}`); break;
        case "D": newPoints.push(`${x}:${y - i}`); break;
      }
    }

    return newPoints
}

let path1Positions = [];
let path2Positions = [];

//build positions array
for (let i = 0; i < path1.length; i++) {
    if(i === 0) {
        path1Positions.push(...moveToPosition("0:0", path1[i]));
    } else {
        path1Positions.push(...moveToPosition(path1Positions[path1Positions.length - 1], path1[i]));
    }
}//build positions array
for (let i = 0; i < path2.length; i++) {
    if(i === 0) {
        path2Positions.push(...moveToPosition("0:0", path2[i]));
    } else {
        path2Positions.push(...moveToPosition(path2Positions[path2Positions.length - 1], path2[i]));
    }
}

path1Positions = [...new Set(path1Positions)];
path2Positions = [...new Set(path2Positions)];

console.log('done bilding positions', path2Positions.length)

console.time()

const overlaps = [...new Set(path1Positions.filter(p1 => path2Positions.includes(p1)))];

console.log('done finding overlaps', overlaps)


// function xy(string) {
//   const [x , y] = string.split(":");
//   return x + ":" + y;
// }


overlaps.shift() //remove 0:0, the startpoint.  

const distances = overlaps.map(d => {
  let x = parseInt(d.split(":")[0])
  let y = parseInt(d.split(":")[1])
  
  x = x < 0 ? x * -1 : x;
  y = y < 0 ? y * -1 : y;
  return x + y;
});


const closestDistance = Math.min(...distances)
console.log('closestDistance: ', closestDistance);

console.timeEnd()