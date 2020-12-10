console.time("runtime");
import { readFileSync } from "fs";

let testMode = false;
const file = testMode ? "input-sample" : "input";
const input = readFileSync(`./4/${file}.txt`, "utf8").split("\n\n");

type Entry = { [entryKey: string]: string };

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
    }, {} as Entry);
  });

function entryIsValid(entry: Entry): boolean {
  const requiredTests = {
    byr: (d) => d.length === 4 && parseInt(d) >= 1920 && parseInt(d) <= 2002,
    iyr: (d) => d.length === 4 && parseInt(d) >= 2010 && parseInt(d) <= 2020,
    eyr: (d) => d.length === 4 && parseInt(d) >= 2020 && parseInt(d) <= 2030,
    hgt: (d) => {
      try {
        const { value, unit } = /(?<value>^\d+)(?<unit>in$|cm$)/gim.exec(
          d
        ).groups;
        switch (unit) {
          case "in":
            return parseInt(value) >= 59 && parseInt(value) <= 76;
          case "cm":
            return parseInt(value) >= 150 && parseInt(value) <= 193;
        }
      } catch (e) {
        return false;
      }
    },
    hcl: (d) => {
      return /^#[\da-f]{6}$/gim.test(d);
    },
    ecl: (d) => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(d);
    },
    pid: (d) => {
      return /^\d{9}$/gm.test(d);
    },
  };
  let availableKeys = Object.keys(entry);
  const containsAllProps = Object.keys(requiredTests).every((prop) =>
    availableKeys.includes(prop)
  );

  if (!containsAllProps) return false;

  return Object.keys(requiredTests).every((key) => {
    return requiredTests.hasOwnProperty(key)
      ? requiredTests[key](entry[key])
      : false;
  });
}

const numberOfValidPassports = entries.filter(entryIsValid).length;
console.log("numberOfValidPassports: ", numberOfValidPassports);

console.timeEnd("runtime");
