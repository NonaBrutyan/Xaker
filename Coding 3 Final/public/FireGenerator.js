class FireGenerator extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = 10000;
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
        if (this.energy <= 0) this.die();

        else {
            this.energy--;
            var emptyCells = this.chooseCell(0);
            if (emptyCells.length != 0) {
                var randomCell = random(emptyCells);

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }

            if (this.energy > 0 && this.energy <= 30 ) {
                if (weather == 'winter' || weather == 'spring') {
                    if (this.energy % 5 == 0) this.mult(); 
                }
                else {
                    if (this.energy % 2 == 1) this.mult(); 
                }
            }
        }
    }


    mult() {
        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            var randomCell = random(emptyCells);

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 4;

            FireArr.push(new Fire(x,y));
        }
    }

    
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in FireGeneratorArr) {
            if (this.x == FireGeneratorArr[i].x && this.y == FireGeneratorArr[i].y) {
                FireGeneratorArr.splice(i, 1);
                break;
            }
        }
    }
}