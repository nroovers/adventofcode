var fs = require("fs");

var text = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" });
var textByLine = text.split("\n");

// console.log(textByLine[0]);

var xLength = textByLine[0].length;
var yLength = textByLine.length;

var totalXmas = 0;

var refWord = "MAS";
var refWordReversed = reverseString(refWord);

for (let y = 0; y < yLength; y++) {
  for (let x = 0; x < xLength; x++) {
    if (textByLine[y][x] == "A") {
      var slash = readSlash(x, y);
      var backSlash = readBackSlash(x, y);
      if (
        (slash == refWord || slash == refWordReversed) &&
        (backSlash == refWord || backSlash == refWordReversed)
      ) {
        totalXmas++;
      }
    }
  }
}

function readSlash(x, y) {
  return readWord(x - 1, y - 1, 0, (x, y) => [x + 1, y + 1], "");
}
function readBackSlash(x, y) {
  return readWord(x + 1, y - 1, 0, (x, y) => [x - 1, y + 1], "");
}

function readWord(x, y, i, readNext, word) {
  if (i == refWord.length || x < 0 || y < 0 || x >= xLength || y >= yLength) {
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

function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

console.log(totalXmas);
