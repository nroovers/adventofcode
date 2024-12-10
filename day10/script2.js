var fs = require("fs");

var map = fs
  .readFileSync("./input2.txt", { encoding: "utf8", flag: "r" })
  .split("\n")
  .map((line) =>
    line
      .trimEnd()
      .split("")
      .map((value) => parseInt(value))
  );

var xMax = map[0].length;
var yMax = map.length;

function calculateScore(step, x, y) {
  if (step === 9) return 1;
  else
    return (
      (x + 1 < xMax && map[y][x + 1] === step + 1
        ? calculateScore(step + 1, x + 1, y)
        : 0) +
      (0 <= x - 1 && map[y][x - 1] === step + 1
        ? calculateScore(step + 1, x - 1, y)
        : 0) +
      (y + 1 < yMax && map[y + 1][x] === step + 1
        ? calculateScore(step + 1, x, y + 1)
        : 0) +
      (0 <= y - 1 && map[y - 1][x] === step + 1
        ? calculateScore(step + 1, x, y - 1)
        : 0)
    );
}
var total = 0;
for (let y = 0; y < yMax; y++) {
  for (let x = 0; x < xMax; x++) {
    if (map[y][x] === 0) {
      total += calculateScore(0, x, y);
    }
  }
}

console.log(total);
