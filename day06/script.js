var fs = require("fs");

var field = fs
  .readFileSync("./input1.txt", { encoding: "utf8", flag: "r" })
  .split("\n")
  .map((line) => line.split("")); 

var xMax = field[0].length;
var yMax = field.length;

console.log(xMax, yMax);

var currentPosition = [0, 0];
var currentDirection = "up";

var stepsCount = 0;

var directions = {
  up: {
    nextPosition: (x, y) => [x, y - 1],
    nextDirection: "right",
  },
  right: {
    nextPosition: (x, y) => [x + 1, y],
    nextDirection: "down",
  },
  down: {
    nextPosition: (x, y) => [x, y + 1],
    nextDirection: "left",
  },
  left: {
    nextPosition: (x, y) => [x - 1, y],
    nextDirection: "up",
  },
};

function setStartPosition() {
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      if (field[y][x] == "^") {
        currentPosition = [x, y];
        return;
      }
    }
  }
}

function isPositionInField(x, y) {
  return 0 <= x && x < xMax && 0 <= y && y < yMax;
}

function canMoveTo(x, y) {
  return field[y][x] != "#";
}

function markVisited(x, y) {
  field[y][x] = "X";
}

setStartPosition();

console.log("Current direction:", currentDirection);
console.log("Current position:", currentPosition);

while (true) {
  var nextPosition = directions[currentDirection]["nextPosition"](
    currentPosition[0],
    currentPosition[1]
  );
  if (!isPositionInField(nextPosition[0], nextPosition[1])) {
    // console.log("end");
    break;
  } else if (canMoveTo(nextPosition[0], nextPosition[1])) {
    markVisited(currentPosition[0], currentPosition[1]);
    currentPosition = nextPosition;
    // console.log("move next", nextPosition[0], nextPosition[1]);
  } else {
    currentDirection = directions[currentDirection]["nextDirection"];
    // console.log("change direction", currentDirection);
  }
}

for (let y = 0; y < yMax; y++) {
  for (let x = 0; x < xMax; x++) {
    if (field[y][x] == "X") {
      stepsCount += 1;
    }
  }
}

console.log(`Step count: ${stepsCount}`);
