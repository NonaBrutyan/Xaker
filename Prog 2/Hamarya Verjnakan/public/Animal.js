class Animal extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = 20
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

    
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    
    eat() {
        if (this.energy <= 0) this.die();
        else {
            var grassEatCells = this.chooseCell(2);
            if (grassEatCells.length != 0) {
                this.energy+=2;
                var randomCell = random(grassEatCells);
                
                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;

                if(this.energy >= 2) this.mult();
            }
            else this.move();
        }
    }


    mult() {
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 3;

            grassEaterArr.push(new Animal(x,y));

            if (weather == 'spring') this.energy = 7; 
            else if (weather == 'autumn') this.energy = 6; 
            else this.energy = 5; 
        }
    }

   
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in animalArr) {
            if (this.x == animalArr[i].x && this.y == animalArr[i].y) {
                animalArr.splice(i, 1);
                break;
            }
        }
    }
}















