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

var trails = {};

function findTrail(step, x, y, startX, startY) {
  if (step === 9) {
    if (trails[`${startX}-${startY}`] == undefined)
      trails[`${startX}-${startY}`] = [`${x}-${y}`];
    else if (!trails[`${startX}-${startY}`].includes(`${x}-${y}`))
      trails[`${startX}-${startY}`].push(`${x}-${y}`);
  } else {
    if (x + 1 < xMax && map[y][x + 1] === step + 1)
      findTrail(step + 1, x + 1, y, startX, startY);
    if (0 <= x - 1 && map[y][x - 1] === step + 1)
      findTrail(step + 1, x - 1, y, startX, startY);
    if (y + 1 < yMax && map[y + 1][x] === step + 1)
      findTrail(step + 1, x, y + 1, startX, startY);
    if (0 <= y - 1 && map[y - 1][x] === step + 1)
      findTrail(step + 1, x, y - 1, startX, startY);
  }
}

for (let y = 0; y < yMax; y++) {
  for (let x = 0; x < xMax; x++) {
    if (map[y][x] === 0) {
      findTrail(0, x, y, x, y);
    }
  }
}

console.log(trails);

var total = 0;
Object.values(trails).forEach((value) => (total += value.length));

console.log(total);
