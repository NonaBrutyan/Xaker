class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0
        this.energy = 15;
        this.directions = [];
    }



    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }




    move() {
        this.energy-= 5;
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2
            this.y = newY;
            this.x = newX;
           
        }
    }




    eat() {
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2
            
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;

                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        } 
    }


    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        
  
        if (newCell && this.multiply >= 2) {
          var newGrassEater = new GrassEater(newCell[0], newCell[1],);
          grassEaterArr.push(newGrassEater);
          matrix[newCell[1]][newCell[0]] = 1;
          this.multiply = 0;
        }
      }
    




    die() {
        
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;


            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    console.log("die")
                    break; 
                }
            }

        }

    }

}
