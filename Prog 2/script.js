var side = 10;
var grassArr = [];
var matrix = [];
var grassEaterArr = [];


function setup() {
    frameRate(4)
    createCanvas(49 * side, 49 * side);
    background('#acacac');

  for (var y = 0; y < 49; y++) {
    matrix[y] = [];
    for (var x = 0; x < 49; x++) {
      let arr = [0, 1, 2]
      let r = random(arr)
      matrix[y][x] = r;
    }
  }

  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y, 1);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var eater = new GrassEater(x, y, 2);
        grassEaterArr.push(eater);
      }
    }
  }

  
}

function draw() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 2) {
        fill("yellow");
        rect(x * side, y * side, side, side);

        
      }
    }
  }

  for (var i in grassArr) {
    grassArr[i].mul();
  }
  for (var i in grassEaterArr) {
    grassEaterArr[i].move();
    grassEaterArr[i].eat();
    grassEaterArr[i].die();
  }
}