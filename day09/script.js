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
  for (var i = 0; i < disk.length; i++) {
    if (disk[i] == ".") {
      var indexOfLastFileBlock = getIndexOfLastFileBlock();
      if (indexOfLastFileBlock < i) {
        return;
      } else {
        disk[i] = disk[indexOfLastFileBlock];
        disk[indexOfLastFileBlock] = ".";
      }
    }
  }
}

function getIndexOfLastFileBlock() {
  return disk.findLastIndex((block) => block != ".");
}

function calculateChecksum() {
  return disk
    .map((value, index) => {
      return value == "." ? 0 : value * index;
    })
    .reduce((total, value) => {
      return total + value;
    }, 0);
}

intiDisk();

// console.log(disk);

sortDisk();

// console.log(disk);

var checksum = calculateChecksum();

console.log(checksum);
