class GrassEater extends Creature {

    constructor(x, y) {
        super(x, y);
        this.gender = Math.round(Math.random()); // 0 - Female, 1 - Male
        this.energy = 10000
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


    chooseCell(ch) {
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }


    eat() {
        if (this.energy <= 0) this.die();
        else {
            this.move();
            var grassCells = this.chooseCell(1);
            if (grassCells.length != 0) {
                this.energy += 5;
                var randomCell = random(grassCells);

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;
                
                
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

                this.x = x;
                this.y = y;

                if (this.energy >= 1) this.mult();
            }
        }
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
    }

    mult() {
        if (this.gender == 0) {
            var sameCell = this.chooseCell(2);
            var emptyCells = this.chooseCell(0);
            if (sameCell.length != 0 && emptyCells.length != 0) {
                var randomSameCell = random(emptyCells);
                var a = randomSameCell[0];
                var b = randomSameCell[1];

                grassEaterArr.push(new GrassEater(a, b));
                matrix[b][a] = 2;
                // console.log('New Grass Eater was born!');
            }
            if (weather == 'winter') this.energy = 13;
            else if (weather == 'summer') this.energy = 7;
            else this.energy = 10;
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}