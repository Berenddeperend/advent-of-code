console.time("runtime");
const fs = require("fs");
const input = fs
  .readFileSync("./input-sample.txt", "utf8")
  .split("\n")
  .map((line) => line.match(/(\d+,\d+)/g));

function parseLine(line) {
  const [from, to] = line;
  const [fromX, fromY] = from.split(",").map((d) => parseInt(d));
  const [toX, toY] = to.split(",").map((d) => parseInt(d));

  return { fromX, fromY, toX, toY };
}

function logGrid(grid) {
  console.log(
    grid
      .map((d) => d.map((i) => (i == 0 ? "." : i)))
      .map((d) => d.join(" "))
      .join("\n")
  );
}

function createGrid(lines) {
  const maxX = Math.max(
    ...lines.map((line) => parseLine(line).fromX),
    ...lines.map((line) => parseLine(line).toX)
  );

  const maxY = Math.max(
    ...lines.map((line) => parseLine(line).fromY),
    ...lines.map((line) => parseLine(line).toY)
  );

  const gridSize = Math.max(maxX, maxY);

  let grid = [];
  for (let i = 0; i <= gridSize; i++) {
    grid.push([]);
    for (let j = 0; j <= gridSize; j++) {
      grid[i].push(0);
    }
  }

  return grid;
}

let grid = createGrid(input);

input.map((line) => {
  const c = parseLine(line); //c for coordinates
  const dir = c.fromY === c.toY ? "X" : "Y";
  const reverse = c.fromY > c.toY || c.fromX > c.toX;

  const diagonal = c.fromX !== c.toX && c.fromY !== c.toY
  
 
  if (diagonal) {
    //fuck it i'm tired of 'c.fromX'-ing 
    let { fromX, fromY, toX, toY } = parseLine(line);
    
    const xShouldIncrement = fromX < toX;
    const yShouldIncrement = fromY < toY;
    
    
    console.log('-> ', fromX, fromY, toX, toY);

    while(fromX !== toX) {
      console.log('fromX, fromY, toX, toY: ', fromX, fromY, toX, toY);

      if(xShouldIncrement) {
        if(yShouldIncrement) {
          grid[fromY][fromX]++;
          fromX++;
          fromY++;
        }
        else {
          grid[fromY][fromX]++;
          fromX++;
          fromY--;
        }
      } else {
        if(yShouldIncrement) {
          grid[fromY][fromX]++;
          fromX--;
          fromY++
        }
        else {
          grid[fromY][fromX]++;
          fromX--;
          fromY--;
        }
      }
    }

  } else {
    if (reverse) {
      for (let i = c["to" + dir]; i <= c["from" + dir]; i++) {
        dir === "X" ? grid[c.fromY][i]++ : grid[i][c.fromX]++;
      }
    } else {
      for (let i = c["from" + dir]; i <= c["to" + dir]; i++) {
        dir === "X" ? grid[c.fromY][i]++ : grid[i][c.fromX]++;
      }
    }
    
  }
  
});

logGrid(grid)


const deadlySpotsCount = grid.flat().reduce((acc, curr, i) => {
  return curr >= 2 ? ++acc : acc;
}, 0);

console.log('deadlySpotsCount: ', deadlySpotsCount);

console.timeEnd("runtime");
