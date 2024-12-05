var fs = require("fs");

var text = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" });
var textByLine = text.split("\n");

// console.log(textByLine[0]);
// console.log(textByLine[0][0]);

var xLength = textByLine[0].length;
var yLength = textByLine.length;

var totalXmas = 0;

for (let y = 0; y < yLength; y++) {
  for (let x = 0; x < xLength; x++) {
    if (textByLine[y][x] == "X") {
      var strings = [
        readTop(x, y),
        readTopRight(x, y),
        readRight(x, y),
        readBottomRight(x, y),
        readBottom(x, y),
        readBottomLeft(x, y),
        readLeft(x, y),
        readTopLeft(x, y),
      ];
      totalXmas += countXmas(strings);
    }
  }
}

function readTop(x, y) {
  return readWord(x, y, 0, (x, y) => [x, y - 1], "");
}
function readTopRight(x, y) {
  return readWord(x, y, 0, (x, y) => [x + 1, y - 1], "");
}
function readRight(x, y) {
  return readWord(x, y, 0, (x, y) => [x + 1, y], "");
}
function readBottomRight(x, y) {
  return readWord(x, y, 0, (x, y) => [x + 1, y + 1], "");
}
function readBottom(x, y) {
  return readWord(x, y, 0, (x, y) => [x, y + 1], "");
}
function readBottomLeft(x, y) {
  return readWord(x, y, 0, (x, y) => [x - 1, y + 1], "");
}
function readLeft(x, y) {
  return readWord(x, y, 0, (x, y) => [x - 1, y], "");
}
function readTopLeft(x, y) {
  return readWord(x, y, 0, (x, y) => [x - 1, y - 1], "");
}

function readWord(x, y, i, readNext, word) {
  if (i == 4 || x < 0 || y < 0 || x >= xLength || y >= yLength) {
    return word;
  }
  var next = readNext(x, y);
  return readWord(
    next[0],
    next[1],
    ++i,
    readNext,
    word.concat(textByLine[y][x])
  );
}

function countXmas(strings) {
  var count = 0;
  strings.forEach((string) => {
    if (string == "XMAS") {
      count++;
    }
  });
  return count;
}

console.log(totalXmas);
