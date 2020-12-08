console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./4/input.txt", "utf8").split("\n\n");

const entries = input
  .map((entry) => {
    return entry
      .split(" ")
      .map((item) => item.split("\n"))
      .flat(2);
  })
  .map((entry) => {
    return entry.reduce((acc, curr) => {
      const [key, value] = curr.split(":");
      acc[key] = value;
      return acc;
    }, {});
  });

function entryIsValid(entry: any): boolean {
  const requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const optionalProps = ["cid"];
  let availableKeys = Object.keys(entry);
  return requiredProps.every((prop) => availableKeys.includes(prop));
}

const numberOfValidPassports = entries.filter(entryIsValid).length;
console.log("numberOfValidPassports: ", numberOfValidPassports);

console.timeEnd("runtime");
