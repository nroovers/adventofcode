var fs = require("fs");

var field = fs
  .readFileSync("./input2.txt", { encoding: "utf8", flag: "r" })
  .split("\n")
  .map((line) => line.trimEnd().split(""));

var xMax = field[0].length;
var yMax = field.length;

function calculatePlot(letter, x, y, perimeter, area) {
  field[y][x] = field[y][x].concat(".");
  var perimiterUpdated = perimeter;
  var areaUpdated = area + 1;
  nextFunctions.forEach((getNext) => {
    var [nextX, nextY] = getNext(x, y);
    if (
      0 > nextX ||
      nextX >= xMax ||
      0 > nextY ||
      nextY >= yMax ||
      field[nextY][nextX].charAt(0) != letter
    ) {
      perimiterUpdated += 1;
    } else if (field[nextY][nextX].length == 1) {
      [perimiterUpdated, areaUpdated] = calculatePlot(
        letter,
        nextX,
        nextY,
        perimiterUpdated,
        areaUpdated
      );
    }
  });
  return [perimiterUpdated, areaUpdated];
}

var nextFunctions = [
  (x, y) => [x - 1, y],
  (x, y) => [x + 1, y],
  (x, y) => [x, y - 1],
  (x, y) => [x, y + 1],
];

var cost = 0;
for (let y = 0; y < yMax; y++) {
  for (let x = 0; x < xMax; x++) {
    if (field[y][x].length == 1) {
      var [perimeter, area] = calculatePlot(field[y][x], x, y, 0, 0);
      cost += perimeter * area;
      console.log(field[y][x], area, perimeter, cost);
    }
  }
}
