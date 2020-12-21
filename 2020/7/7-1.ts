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

function downTheRabbitHole(bagName: string) {
  const mapping = {}

  bags
    .find((bag) => bag.bagName === bagName)
    .contains.map((bag) => {
      for(let i=0; i < bag.quantity; i++) {
        mapping.hasOwnProperty(bag.target) ? 
          mapping[bag.target] ++ :
          mapping[bag.target] = 1

        downTheRabbitHole(bag.target)
      }
    });

    return mapping;
}

const answer = downTheRabbitHole("shiny gold");

console.log(answer)

console.timeEnd("runtime");
