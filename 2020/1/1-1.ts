console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./1/input.txt", 'utf8').split("\n").map(string => parseInt(string))

input.forEach((number1) => {
  input.forEach((number2) => {
    input.forEach((number3) => {
      if(number1 + number2 + number3 === 2020) {
        console.log(number1 * number2 * number3)
      }
    })
  })
})

console.timeEnd("runtime");