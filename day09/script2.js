var fs = require("fs");

var input = fs.readFileSync("./input1.txt", { encoding: "utf8", flag: "r" });

var disk = [];

function addFile(size, id) {
  for (var i = 0; i < size; i++) {
    disk.push(id);
  }
}

function addEmptySpace(size) {
  for (var i = 0; i < size; i++) {
    disk.push(".");
  }
}

function intiDisk() {
  for (var i = 0; i < input.length; i++) {
    if (i % 2 == 0) {
      addFile(input[i], Math.floor(i / 2));
    } else {
      addEmptySpace(input[i]);
    }
  }
}

function sortDisk() {
  var i = disk.length;
  while (i > 0) {
    // console.log("");
    // console.log("i", i);
    var [blockStart, blockSize] = getLastWholeFileBlock(i);
    var emptyIndex = getFirstEmptyBlockIndex(blockSize);

    // console.log("start and size", blockStart, blockSize);
    // console.log("empty", emptyIndex);

    if (blockStart < 0) {
      break;
    }
    if (0 <= emptyIndex && emptyIndex < i && emptyIndex < blockStart) {
      var block = disk.slice(blockStart, blockStart + blockSize);
      insert(block, emptyIndex);
      insert(".".repeat(blockSize).split(""), blockStart);
    }

    i = blockStart;
  }
}

function getFirstEmptyBlockIndex(size) {
  var emptyString = ".".repeat(size);
  for (var i = 0; i < disk.length - size; i++) {
    if (disk.slice(i, i + size).join("") == emptyString) {
      return i;
    }
  }
  return -1;
}

function getLastWholeFileBlock(fromIndex) {
  // var blockEnd = disk.findLastIndex((block) => (block != "."), );
  // var blockStart = disk.indexOf(disk[blockEnd]);
  // return [blockStart, blockEnd - blockStart + 1];
  var char;
  var blockEnd;
  var blockStart;
  for (var i = fromIndex - 1; i >= 0; i--) {
    // console.log(disk[i]);
    if (char == undefined) {
      if (disk[i] != ".") {
        char = disk[i];
        blockStart = i;
        blockEnd = i;
      }
    } else if (char == disk[i]) {
      blockStart = i;
    } else {
      return [blockStart, blockEnd - blockStart + 1];
    }
  }
  return [-1, 0];
}

function insert(array, atIndex) {
  if (atIndex > disk.length) return;
  // console.log("insert", array, atIndex);
  for (var i = 0; i < array.length; i++) {
    disk[i + atIndex] = array[i];
  }
  // console.log("result", disk);
}

function calculateChecksum() {
  return disk
    .map((value, index) => (value == "." ? 0 : value * index))
    .reduce((total, value) => total + value, 0);
}

intiDisk();

// console.log(disk.length);

// console.log(getLastWholeFileBlock(36));
// console.log(getFirstEmptyBlockIndex(3));

// console.log(disk);

sortDisk();

// console.log(disk);

var checksum = calculateChecksum();

console.log(checksum);
