console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2022/7/input.txt", 'utf8').split('\n');

type Dir = {
    dirName: string;
    parent: Dir;
    size: number;
    subDirs: {
        [name: string]: Dir
    }
    files: {
        [name: string]: number
    }
}


const createDir = (dirName, parent): Dir => {
    return {
        dirName,
        parent,
        size: 0,
        subDirs: {},
        files: {}
    }
}

const updateAllParentSizes = (dir, fileSize: number) => {
    dir.size += fileSize;
    
    if(dir.parent) {
        updateAllParentSizes(dir.parent, fileSize)
    }
}

const tree = createDir('', null);
let currentDir = tree;
currentDir.subDirs['/'] = createDir('/', currentDir);

const executeLine = (line: string, index: number) => {
    const splitLine = line.split(' ');
    const lastPart = splitLine[splitLine.length -1];
    const isCommand = line.startsWith('$')

    if(!isCommand) { // ls-ing
        if(line.startsWith('dir')) {
            currentDir.subDirs[lastPart] = createDir(lastPart, currentDir);
        } else {
            currentDir.files[lastPart] = Number(splitLine[0]);
            updateAllParentSizes(currentDir, Number(splitLine[0]))
        }
    }

    if (line.startsWith('$ cd ')) {
        currentDir = lastPart === '..' ? currentDir.parent : currentDir.subDirs[lastPart];
    }
}
 
input.forEach(executeLine);
// console.log(tree)

const foldersBelow100k: Dir[] = []


const findFoldersWithSizeBelow100kRecursively = (dir: Dir): {dirs: Dir[], size: number} => {
    const ownFilesSizeSum = Object.values(dir.files).reduce((acc, curr) => acc + curr, 0);

    //for every subdir, down the rabbit hole
    const subDirsSizeSum = Object.values(dir.subDirs).reduce((acc, subdir) => {
        return acc + findFoldersWithSizeBelow100kRecursively(subdir).size
    }, 0);


    if((ownFilesSizeSum + subDirsSizeSum) <= 100000) {
        foldersBelow100k.push(dir)
    }

    if(Object.values(dir.subDirs).length === 0) {
        return {dirs: foldersBelow100k, size: ownFilesSizeSum}
    } 

    return {dirs: foldersBelow100k, size: ownFilesSizeSum + subDirsSizeSum} 
}

const outcome = findFoldersWithSizeBelow100kRecursively(tree).dirs.reduce((acc, curr) => {
    return acc + curr.size
}, 0)

console.log('outcome', outcome)


console.timeEnd("runtime");