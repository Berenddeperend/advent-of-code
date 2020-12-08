console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./3/input.txt", 'utf8').split("\n");

const encounteredTrees = input.reduce((trees, row, index) => {
  if(index === 0) return trees;
  trees = row[index * 3 % row.length] === "#" ? trees + 1 : trees;
  return trees;
}, 0)

console.log('encounteredTrees: ', encounteredTrees);


console.timeEnd("runtime");