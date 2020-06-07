console.time()
const input = "197487-673251".split("-");

const from = parseInt(input[0])
const to = parseInt(input[1])

function containsDoubleStrict(number) {
  const arr = String(number).split("");
 
  return arr.some((digit, index) =>{
    return arr[index] === arr[index + 1] &&
           arr[index] !== arr[index + 2] &&
           arr[index] !== arr[index - 1];
  })

}

function hasSixDigits(number) {
  const arr = String(number).split("");
  return arr.length === 6;
}

function doesIncrease(number) {
  const arr = String(number).split("").map(s => Number(s));
  return arr.every((digit, index) => {
    if(index === arr.length - 1) return true;
    return arr[index] <= arr[index + 1]
  });
}

let counter = 0;

for(let i = from; i < to; i++) {
    if(containsDoubleStrict(i) && hasSixDigits(i) && doesIncrease(i)) {
      counter++
    }
}

console.log(counter)
console.timeEnd()