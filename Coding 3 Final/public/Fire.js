class Fire extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = 11000;
        this.directions = [];
    }

    
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    
    getNewSmallCoordinates() {
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

     
    chooseCell(character) {
        if (weather == 'winter' || weather == 'spring') this.getNewSmallCoordinates(); 
        else this.getNewCoordinates(); 
        return super.chooseCell(character);
    }

    
    killCell() {
        if (weather == 'winter' || weather == 'spring') this.getNewSmallCoordinates(); 
        else this.getNewCoordinates(); 

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }

    
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    
    burn() {
        if (this.energy > 10) this.move();

        else if (this.energy <= 0) this.die();

        else {
            this.energy--;
            var allCells = this.killCell();
            if (allCells.length != 0) {
                for (var i in allCells) {
                    var x = allCells[i][0];
                    var y = allCells[i][1];

                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                        if (matrix[y][x] == 1) {
                            matrix[y][x] == 0;
                            for (var i in grassArr) {
                                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                                    grassArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 2) {
                            matrix[y][x] == 0;
                            for (var i in grassEaterArr) {
                                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                                    grassEaterArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 3) {
                            matrix[y][x] == 0;
                            for (var i in animalArr) {
                                if (this.x == animalArr[i].x && this.y == animalArr[i].y) {
                                   animalArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 5) {
                            matrix[y][x] == 0;
                            for (var i in FireGeneratorArr) {
                                if (this.x == FireGeneratorArr[i].x && this.y == FireGeneratorArr[i].y) {
                                    FireGeneratorArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        matrix[this.y][this.x] = 0;

                        this.x = x;
                        this.y = y;
                    }
                }
            }
        }
    }

   
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in FireArr) {
            if (this.x == FireArr[i].x && this.y == FireArr[i].y) {
               FireArr.splice(i, 1);
                break;
            }
        }
    }
}