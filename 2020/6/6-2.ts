console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./6/input.txt", "utf8").split("\n\n");

const answer = input.reduce((total, group) => {
  const people = group.split("\n").map((person) => {
    return person.split("");
  });

  const everyoneAnswered = [...new Set(people.flat())].reduce((acc, curr) => {
    return people.every(person => person.includes(curr)) ? ++acc : acc
  }, 0)
  
  return total + everyoneAnswered;
}, 0);

console.log(answer)

console.timeEnd("runtime");
 