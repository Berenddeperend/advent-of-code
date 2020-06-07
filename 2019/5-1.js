const input = document.querySelector("pre").textContent.split(",").map(i => parseInt(i))

function process(noun, verb, source) {
    const workingData = [...source];
    workingData[1] = noun;
    workingData[2] = verb;

    for (let i = 0; i < workingData.length; i++) {
      if(i % 4 === 0) {  
        if(workingData[i] === 99) break;
        
        let workValue1 = workingData[workingData[i + 1]];
        let workValue2 = workingData[workingData[i + 2]];

        if(workingData[i] === 1) {           
          workingData[workingData[i + 3]] = workValue1 + workValue2;
        } else if (workingData[i] === 2) {
          workingData[workingData[i + 3]] = workValue1 * workValue2;
        } else if (workingData[i] === 3) {
          workingData[workingData[i + 2]] = workValue1;
        } else if (workingData[i] === 3) {
          workingData[workingData[i + 2]] = workValue1;
        }
      }
    }

    return workingData;    
}


let noun = 0;
let verb = 0;

process(noun, verb, input);

// while( process(noun, verb, input)[0] !== 19690720 ) {
//     noun++;
//     if(noun > 100) {
//         noun = 0;
//         verb ++;
//     }
// }


console.log('done running', noun, verb);