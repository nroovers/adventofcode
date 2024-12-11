// var input = "125 17";
var input = "9694820 93 54276 1304 314 664481 0 4";

var array = input.split(" ");

var countCache = {};

function countStones(value, i) {
  var key = `${value}-${i}`;
  if (countCache[key] != undefined) {
    return countCache[key];
  }
  var count = 0;
  if (i == 0) {
    count = 1;
  } else if (value == "0") {
    count = countStones("1", i - 1);
  } else if (value.length % 2 == 0) {
    count =
      countStones(value.slice(0, value.length / 2), i - 1) +
      countStones(trimTrailingZero(value.slice(value.length / 2)), i - 1);
  } else {
    count = countStones((value * 2024).toString(), i - 1);
  }
  countCache[key] = count;
  return count;
}

function trimTrailingZero(str) {
  return parseInt(str).toString();
}

var start = Date.now();

var total = array
  .map((value) => countStones(value, 75))
  .reduce((total, value) => total + value, 0);

var end = Date.now();

console.log("time:", (end - start) / 60000);

console.log("stone count:", total);
