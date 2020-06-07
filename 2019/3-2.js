console.time()
const fs = require('fs');
const input = fs.readFileSync("./3-input.txt", 'utf8').split("\n").filter(d => d.length)
// const input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83`.split("\n").filter(d => d.length);

const path1 = input[0].split(",")
const path2 = input[1].split(",")
 


function buildCoordinates(paths) {
  let visitedCoordinates = [[0, 0, 0]];
  
  function moveTo(direction, startPoint, stepNumber) {
    const [x, y] = startPoint;
    switch(direction) {
      case "L": return [x - 1, y, stepNumber];
      case "R": return [x + 1, y, stepNumber];
      case "U": return [x, y + 1, stepNumber];
      case "D": return [x, y - 1, stepNumber];
    }
  } 
  
  let stepsTaken = 0;
  for (let i = 0; i < paths.length; i++) {
    const direction = paths[i][0];
    const ammount = parseInt(paths[i].substring(1));
  
    for(let step = 0; step < ammount; step++) {
      stepsTaken ++;
      visitedCoordinates.push(moveTo(direction, visitedCoordinates[visitedCoordinates.length -1], stepsTaken))
    }
  }

  return visitedCoordinates;
}

function pointsMatch(arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1]
}

const visitedPoints1 = buildCoordinates(path1)
const visitedPoints2 = buildCoordinates(path2)
// let overlaps = visitedPoints1.filter(point1 => visitedPoints2.some(point2 => comparePoints(point1, point2)));

const overlaps = visitedPoints1.reduce((acc, point1, i) => {
  visitedPoints2.map(point2 => {
    if(pointsMatch(point1, point2)) {

      acc.push([point1[0], point1[1], point1[2] + point2[2]])
    }
  })

  if(i % 100 === 0) {
    console.log(`${i / visitedPoints1.length * 100}% done`)
  } 

  return acc;
}, []);

overlaps.shift(); //remove start point

// console.log(overlaps[0])

const firstIntersection = Math.min(...overlaps.map(d => d[2]));
console.log('firstIntersection: ', firstIntersection);

console.timeEnd() //928033.400ms