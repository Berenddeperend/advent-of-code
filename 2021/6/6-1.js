console.time("runtime");
const fs = require("fs");
let input = fs
  .readFileSync("./input-sample.txt", "utf8")
  .split(",")
  .map((d) => parseInt(d));


for (let i = 0; i < 256; i++) {
	console.log(i)
	input.forEach((fish, fishIndex) => {
		if(fish === 0) {
				input.push(8)
				input[fishIndex] = 6
			} else {
				input[fishIndex] = fish -1
			}
	})
}

console.log(input.length)



console.timeEnd("runtime");
