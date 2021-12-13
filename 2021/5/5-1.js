console.time("runtime");
const fs = require("fs");
const input = fs.readFileSync("./input-sample.txt", "utf8").split("\n");
console.log('input: ', input);


// (\d,\d)
console.timeEnd("runtime");

