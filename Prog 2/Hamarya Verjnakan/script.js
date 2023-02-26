var side = 10;
var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var animalArr = [];
var FireArr = [];
var FireGeneratorArr = [];
var WaterArr = [];


var days = 0;
var FrameSec = 0;
var weather = "winter";


var Statistics = {
  weather: "",
  grass: 0,
  grassEater: 0,
  animal: 0,
  Fire: 0,
  FireGenerator: 0,
  Water: 0,

}



function setup() {
  frameRate(4)
  createCanvas(50 * side, 50 * side);
  background('#acacac');

  for (var y = 0; y < 50; y++) {
    matrix[y] = [];
    for (var x = 0; x < 50; x++) {
      let arr = [0, 1, 2, 3, 4, 5, 6];
      let r = random(arr)
      matrix[y][x] = r;
    }
  }


  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      }
      else if (matrix[y][x] == 2) {
        if (grassEaterArr.length <= 20) {
          var grEater = new GrassEater(x, y);
          grassEaterArr.push(grEater);
        }
        else matrix[y][x] = 0;
      }
      else if (matrix[y][x] == 3) {
        if (animalArr.length <= 20) {
          var animal = new Animal(x, y);
          animalArr.push(animal);
        }
        else matrix[y][x] = 0;
      }
      else if (matrix[y][x] == 4) {
        var randFire = new Fire(x, y);
        FireArr.push(randFire);
      }
      else if (matrix[y][x] == 5) {
        var randFireGen = new FireGenerator(x, y);
        FireGeneratorArr.push(randFireGen);
      }
      else if (matrix[y][x] == 6) {
        if (WaterArr.length <= 20) {
          var wt = new Water(x, y);
          WaterArr.push(wt);
        }
        else matrix[y][x] = 0;
      }
    }
  }
}


function draw() {

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
          fill("green");
       }
      else if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("#a8653e");
      } else if (matrix[y][x] == 4) {
        fill("red");
      } else if (matrix[y][x] == 5) {
        fill("orange");
      } else if (matrix[y][x] == 6) {
        fill("blue");
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
  for (var i in FireArr) {

    FireArr[i].move();
    FireArr[i].burn();
    FireArr[i].die();
  }
  for (var i in FireGeneratorArr) {
    FireGeneratorArr[i].move();
    FireGeneratorArr[i].mult();
    FireGeneratorArr[i].die();
  }
  for (var i in WaterArr) {
    WaterArr[i].move();
    WaterArr[i].extinguish();
    WaterArr[i].die();
  }

  days++
  FrameSec++

  if (days <= 25) {
    weather = "winter"
    document.body.style.background = '#f7f7f7'
    document.getElementById("Weather").innerText = "Winter"
  }
  else if (days > 25 && days <= 50) {
    weather = "spring"
    document.body.style.background = '#b6e3f2'
    document.getElementById("Weather").innerText = "Spring"
  }
  else if (days > 50 && days <= 75) {
    weather = "summer"
    document.body.style.background = '#d3f2b6'
    document.getElementById("Weather").innerText = "Summer"
  }
  else if (days > 75 && days <= 100) {
    weather = "autumn"
    document.body.style.background = '#ffbe3d'
    document.getElementById("Weather").innerText = "Autumn"
  }
  else if (days == 101) {
    days = 0
  }


}


