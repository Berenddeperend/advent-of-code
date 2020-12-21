console.time("runtime");
import { readFileSync } from "fs";

const input = readFileSync("./7/input.txt", "utf8").split("\n");

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

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    }
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

function addObjs(objA, objB) {
  const objC = { ...objA };
  Object.entries(objB).map((tuple) => {
    objC.hasOwnProperty(tuple[0])
      ? (objC[tuple[0]] += tuple[1])
      : (objC[tuple[0]] = tuple[1]);
  });

  return objC;
}
let iterations = 0;

const downTheRabbitHole = memoize((bagName: string) => {
  iterations++;
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
})


const answer = bags.reduce((BagsWithTargetBag, bag) => {
  return Object.keys(downTheRabbitHole(bag.bagName)).includes("shiny gold")
    ? ++BagsWithTargetBag
    : BagsWithTargetBag;
}, 0);

console.log(answer)

console.timeEnd("runtime");
