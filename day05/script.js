var fs = require("fs");

var orderRulesText = fs
  .readFileSync("./order.txt", { encoding: "utf8", flag: "r" })
  .split("\n");
var updatesText = fs
  .readFileSync("./updates.txt", { encoding: "utf8", flag: "r" })
  .split("\n");

var orderRules = {};

orderRulesText.forEach((orderRule) => {
  var [i, j] = orderRule.split("|");
  var intI = parseInt(i);
  var intJ = parseInt(j);
  if (orderRules[intI] == undefined) {
    orderRules[intI] = [intJ];
  } else {
    orderRules[intI].push(intJ);
  }
});

function isCorrectlySorted(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (orderRules[array[j]]?.includes(array[i])) return false;
    }
  }
  return true;
}

function getMiddle(array) {
  return array[Math.floor(array.length / 2)];
}

function sort(array) {
  var sortedArray = [];
  array.forEach((x) => {
    if (sortedArray.length == 0) sortedArray = [x];
    else
      for (var i = 0; i < sortedArray.length; i++) {
        if (orderRules[x]?.includes(sortedArray[i])) {
          sortedArray = insert(sortedArray, x, i);
          break;
        } else if (i == sortedArray.length - 1) {
          sortedArray = insert(sortedArray, x, i + 1);
          break;
        }
      }
  });
  return sortedArray;
}

function insert(array, item, index) {
  return [...array.slice(0, index), item, ...array.slice(index, array.length)];
}

// console.log(orderRules);

var total = 0;
var total2 = 0;

updatesText.forEach((updatesString) => {
  var updates = updatesString.split(",").map((x) => parseInt(x));
  // console.log(updates, isCorrectlySorted(updates), getMiddle(updates));
  if (isCorrectlySorted(updates)) {
    total += getMiddle(updates);
  } else {
    total2 += getMiddle(sort(updates));
  }
});

console.log(total);
console.log(total2);
