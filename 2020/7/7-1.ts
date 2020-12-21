console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./7/input-sample.txt", "utf8").split("\n");

type rule = {
  bagName: string;
  contains: {
    quantity: number;
    target: string;
  }[];
};

function parser(line: string): rule {
  const bagName = line
    .split(" ")
    .filter((word, index) => index <= 1)
    .join(" ");
  const contains =
    line.match(/(\d)( \w+ \w+)/gm)?.map((line) => {
      const [quantity, ...target] = line.split(" ");
      return {
        quantity: parseInt(quantity),
        target: target.join(" "),
      };
    }) || [];
  return { bagName, contains };
}

const bags = input.map(parser);

function addObjs(objA, objB) {
  const objC = { ...objA };
  Object.entries(objB).map((tuple) => {
    objC.hasOwnProperty(tuple[0])
      ? (objC[tuple[0]] += tuple[1])
      : (objC[tuple[0]] = tuple[1]);
  });

  return objC;
}

function downTheRabbitHole(bagName: string) { //todo: not string but obj as argument
  let mapping = {};

  bags
    .find((bag) => bag.bagName === bagName)
    .contains.map((bag) => {
      for (let i = 0; i < bag.quantity; i++) {
        mapping.hasOwnProperty(bag.target)
          ? mapping[bag.target]++
          : (mapping[bag.target] = 1);

        mapping = addObjs(mapping, downTheRabbitHole(bag.target));
      }
    });

  return mapping;
}

const answer = bags.reduce((BagsWithTargetBag, bag) => {
  return Object.keys(downTheRabbitHole(bag.bagName)).includes("shiny gold")
    ? ++BagsWithTargetBag
    : BagsWithTargetBag;
}, 0);

// const answer = downTheRabbitHole("shiny gold");
console.log(answer)

console.timeEnd("runtime");
