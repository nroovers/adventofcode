// var input = "125 17";
var input = "9694820 93 54276 1304 314 664481 0 4";

var array = input.split(" ");

// console.log(array);

function blink() {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == "0") {
      array[i] = "1";
    } else if (array[i].length % 2 == 0) {
      var left = array[i].slice(0, array[i].length / 2);
      var right = parseInt(array[i].slice(array[i].length / 2)).toString();
      array[i] = left;
      array = array
        .slice(0, i + 1)
        .concat([right].concat(array.slice(i + 1, array.length)));
      i += 1;
    } else {
      array[i] = (array[i] * 2024).toString();
    }
  }
}

for (var i = 0; i < 25; i++) {
  blink();
  console.log(i + 1);
}

console.log("length:", array.length);
