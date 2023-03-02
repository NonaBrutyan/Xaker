class Water extends Creature {
    
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
        this.directions = [];
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

   
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    
    extinguish() {
        var fireCells = this.chooseCell(4);
        if (fireCells.length != 0) {
            this.energy+=2;
            var randomCell = random(fireCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            for (var i in FireArr) {
                if (this.x == FireArr[i].x && this.y == FireArr[i].y) {
                    FireArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.move();
    }

   
    move() {
        if (this.energy >= 50) this.die();
        else {
            this.energy++;
            var emptyCells = this.chooseCell(0);
            if (emptyCells.length != 0) {
                var randomCell = random(emptyCells);

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 6;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }
    }

    
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in WaterArr) {
            if (this.x == WaterArr[i].x && this.y == WaterArr[i].y) {
                WaterArr.splice(i, 1);
                break;
            }
        }
    }
}