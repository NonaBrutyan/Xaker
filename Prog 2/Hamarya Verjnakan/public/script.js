var cnv;

var side = 10;
var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var animalArr = [];
var FireArr = [];
var FireGeneratorArr = [];
var WaterArr = [];


var days = 0;
var weather = "winter";

var frameSec = 0;

var geToan = 0;
var anToge = 0;


var statistics = {
  "grassSpawn": 0,
  "grassEaterSpawn": 0,
  "animalSpawn": 0,
  "fireSpawn": 0,
  "fireGeneratorSpawn": 0,
  "waterSpawn": 0,
  "weather": "",
  "geToan": 0,
  "anToge": 0
}



function setup() {
  var row = 50, column = 50;

    for (var y = 0; y < row; ++y) {
        matrix[y] = [];

        for (var x = 0; x < column; ++x) {
            matrix[y][x] = Math.round(random(0, 6));
        }
    }

    for (var y = 0 ; y < 50; y++){
      matrix[y] = [];
      for (var x = 0; x < 50; x++){
        let arr = [0,1,2,3,4,5,6]
        let r = random(arr)
        matrix[y][x] = r;
      }
    }

    frameRate(500);
    cnv = createCanvas(matrix[0].length * side, matrix.length * side);
    cnv.mouseClicked(getCoords);
    background('#acacac');

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
      }
      else if (matrix[y][x] == 3) {
        if (animalArr.length <= 20) {
          var animal = new Animal(x, y);
          animalArr.push(animal);
        }
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
      }
    }
  }
}


function draw() {
  drawMatrix();
  
  days++
  frameSec++;

  
  if(days <= 25){
      weather = "winter";
      document.body.style.background = '#f7f7f7';
      document.getElementById('weather').innerText = "Winter";
  }
  else if(days > 25 && days <= 50){
      weather = "spring";
      document.body.style.background = 'lightgreen';
      document.getElementById('weather').innerText = "Spring";
      document.body.style.transition = 'all .7s ease-in';
      document.getElementById('weather').style.transition = 'all .7s ease-in';
  }
  else if(days > 50 && days <= 75){
      weather = "summer";
      document.body.style.background = 'lightblue';
      document.getElementById('weather').innerText = "Summer";
      document.body.style.transition = 'all .7s ease-in';
      document.getElementById('weather').style.transition = 'all .7s ease-in';
  }
  else if(days > 75 && days <= 100){
      weather = "autumn";
      document.body.style.background = 'orange';
      document.getElementById('weather').innerText = "Autumn";
      document.body.style.transition = 'all .7s ease-in';
      document.getElementById('weather').style.transition = 'all .7s ease-in';
  }
  else if (days == 101){
      days = 0;
  }

  
  if (frameSec == 10) {
      generateStatistics();
      frameSec = 0;
  }
  
  
  for (var i in grassArr) {
    grassArr[i].mult();
  }
  for (var i in grassEaterArr) {
    grassEaterArr[i].eat();
  }
  for (var i in animalArr) {
    animalArr[i].eat();
  }
  for (var i in FireArr) {
    FireArr[i].burn();
  }
  for (var i in FireGeneratorArr) {
    FireGeneratorArr[i].move();
  }
  for (var i in WaterArr) {
    WaterArr[i].extinguish();
  }
}


function drawMatrix() {
  for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x] == 1) {
              if (weather == 'winter') { fill('white'); } 
              else if (weather == 'autumn') { fill('#e0bb28') } 
              else { fill("green"); } 
              rect(x * side, y * side, side, side);
          }
          if (matrix[y][x] == 0) {
              fill("#acacac");
              rect(x * side, y * side, side, side);
          }
          else if (matrix[y][x] == 2) {
              fill("yellow");
              rect(x * side, y * side, side, side);
          }
          else if (matrix[y][x] == 3) {
              fill("brown");
              rect(x * side, y * side, side, side);
          }
          else if (matrix[y][x] == 4) {
              fill("red");
              rect(x * side, y * side, side, side);
          }
          else if (matrix[y][x] == 5) {
              fill("blue");
              rect(x * side, y * side, side, side);
          }
          else if (matrix[y][x] == 6) {
              fill("#09eded");
              rect(x * side, y * side, side, side);
          }
      }
  }
}


function getCoords() {
  var i, j;
  console.log("Mouse clicked on coordinates x: " + mouseX + " and y: " + mouseY);
  i = mouseX / 10;
  i = Math.floor(i);
  j = mouseY / 10;
  j = Math.floor(j);
  

  if (matrix[j][i] == 2) {
      for (var k = 0; k < grassEaterArr.length; k++) {
          if (grassEaterArr[k]['x'] == i && grassEaterArr[k]['y'] == j) {
              matrix[j][i] = 3;
              grassEaterArr[k].die();
              var animal = new Animal(i, j);
              animalArr.push(animal);
          }
      }
      geToan++;
      console.log('It was yellow. Now it\'s brown!');
  }
  
  else if (matrix[j][i] == 3) {
      for (var k = 0; k < animalArr.length; k++) {
          if (animalArr[k]['x'] == i && animalArr[k]['y'] == j) {
              matrix[j][i] = 2;
              animalArr[k].die();
              var grEater = new GrassEater(i, j);
              grassEaterArr.push(grEater);
          }
      }
      anToge++;
      console.log('It was brown. Now it\'s yellow!');
  }
}



function generateStatistics() {
  statistics.grassSpawn = grassArr.length;
  statistics.grassEaterSpawn = grassEaterArr.length;
  statistics.animalSpawn = animalArr.length;
  statistics.fireSpawn = FireArr.length;
  statistics.fireGeneratorSpawn = FireGeneratorArr.length;
  statistics.waterSpawn = WaterArr.length;
  statistics.weather = weather;
  statistics.geToan = geToan;
  statistics.anToge = anToge;
  
} 
