var fs = require("fs");

var machines = [
  ...fs
    .readFileSync("./input2.txt", { encoding: "utf8", flag: "r" })
    .matchAll(
      /Button A: X\+(?<ax>\d*), Y\+(?<ay>\d*)\r\nButton B: X\+(?<bx>\d*), Y\+(?<by>\d*)\r\nPrize: X=(?<px>\d*), Y=(?<py>\d*)/g
    ),
].map((match) => match.groups);

function getB(a, machine) {
  var bx = (machine["px"] - a * machine["ax"]) / machine["bx"];
  return isInt(bx) && bx == (machine["py"] - a * machine["ay"]) / machine["by"]
    ? bx
    : -1;
}

function maxA(machine) {
  return Math.max(
    Math.floor(machine["px"] / machine["ax"]),
    Math.floor(machine["py"] / machine["ay"])
  );
}

function isInt(n) {
  return typeof n === "number" && n % 1 == 0;
}

var total = 0;

machines.forEach((machine) =>
  [...Array(maxA(machine)).keys()].forEach((a) => {
    var b = getB(a, machine);
    if (b >= 0) {
      total += a * 3 + b;
    }
  })
);

console.log(total);
