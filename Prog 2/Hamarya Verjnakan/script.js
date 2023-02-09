var side = 10;
var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var animalArr = [];
var fireArr = [];


function setup() {
  frameRate(4)
  createCanvas(50 * side, 50 * side);
  background('#acacac');

  for (var y = 0; y < 50; y++) {
    matrix[y] = [];
    for (var x = 0; x < 50; x++) {
      let arr = [0, 1, 2, 3];
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
      } else if (matrix[y][x] == 3) {
        var animal = new Animal(x, y, 3);
        animalArr.push(animal);
      } else if (matrix[y][x] == 4) {
        var animal = new Fire(x, y);
        fireArr.push(Fire);

      }
    }
  }
}






function draw() {

 console.log(frameCount) ;
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("#a8653e");
      } else if (matrix[y][x] == 4) {
        fill("red")
      }
      rect(x * side, y * side, side, side);

    }
  }

  for (var i in grassArr) {
    grassArr[i].mul();
  }
  for (var i in grassEaterArr) {
    grassEaterArr[i].mul();
    grassEaterArr[i].move();
    grassEaterArr[i].eat();
    grassEaterArr[i].die();

  }
  for (var i in animalArr) {
    animalArr[i].mul();
    animalArr[i].move();
    animalArr[i].eat();
    animalArr[i].die();

  }

  

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      for(var i = 50; i<= 100; i++){
        if(frameCount >= i){
      
          
            matrix[y][x] = 4
          
          
      }

      

 }
}
 }

}

