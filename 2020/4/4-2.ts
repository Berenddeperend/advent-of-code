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
  // const requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const requiredTests = {
    byr: (d) => parseInt(d) >= 1920 && parseInt(d) <= 2002,
    iyr: (d) => parseInt(d) >= 2010 && parseInt(d) <= 2020,
    eyr: (d) => parseInt(d) >= 2020 && parseInt(d) <= 2030,
    hgt: (d) => {
      return d.includes("in")
        ? parseInt(d) >= 59 && parseInt(d) <= 76
        : parseInt(d) >= 150 && parseInt(d) <= 193;
    },
    hcl: (d) => {
      //todo
    },
    ecl: (d) => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(d);
    },
    pid: (d) => {
      //todo
    },
  };
  let availableKeys = Object.keys(entry);
  const containsAllProps = Object.keys(requiredTests).every((prop) =>
    availableKeys.includes(prop)
  );
  return containsAllProps;
}

const numberOfValidPassports = entries.filter(entryIsValid).length;
console.log("numberOfValidPassports: ", numberOfValidPassports);

console.timeEnd("runtime");
