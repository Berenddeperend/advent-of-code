console.time("runtime");
import { readFileSync } from 'fs';

const input = readFileSync("./2022/7/input.txt", 'utf8').split('\n');
const spaceNeeded = 30000000;
const diskCapacity = 70000000;

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


const folders: Dir[] = [];

const createDir = (dirName, parent): Dir => {
    const dir = {
        dirName,
        parent,
        size: 0,
        subDirs: {},
        files: {}
    }
    folders.push(dir)
    return dir;
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


const amountToBeDeleted = spaceNeeded - (diskCapacity - tree.size);

const answer = folders.reduce((acc, curr) => {
    if(acc === null) return curr;
    if(curr.size >= amountToBeDeleted && curr.size < acc.size) {
        return curr;
    }
    return acc;
}, null)

console.log('answer', answer.size)

console.timeEnd("runtime");