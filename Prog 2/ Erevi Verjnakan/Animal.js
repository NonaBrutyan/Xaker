class Animal {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0
        this.energy = 10;
        this.directions = [];
    }

    chooseCell(character) {
        this.getVeryNewCoordinates();
        var Newfound = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    Newfound.push(this.directions[i]);
                }
            }
        }
        return Newfound;
    }




    getVeryNewCoordinates() {
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
        console.log("move")
        this.energy -= 5;
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3
            this.y = newY;
            this.x = newX;

        }
    }




    eat() {
        console.log("eat")
        var newCell = random(this.chooseCell(2));
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;

                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        }
    }


    mul() {
        console.log("mul")
        this.multiply++;
        var newCell = random(this.chooseCell(2));


        if (newCell && this.multiply >= 5) {
            var newAnimal = new Animal(newCell[0], newCell[1]);
            animalArr.push(newAnimal);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
        }
    }





    die() {
        console.log("die")
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;


            for (var i in animalArr) {
                if (this.x == animalArr[i].x && this.y == animalArr[i].y) {
                    animalArr.splice(i, 1);
                    break;
                }
            }

        }

    }

}
















