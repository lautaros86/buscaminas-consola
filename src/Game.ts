
export interface Cell {
    x: number;
    y: number;
}

export class Game {

    boardMines: Array<Cell> = [];
    boardChecked: Array<Cell> = [];
    boardFlags: Array<Cell> = [];
    sizeX: number;
    sizeY: number;
    mines: number;

    constructor(posX, posY, mines) {
        this.sizeX = posX;
        this.sizeY = posY;
        this.mines = mines;
        this.generateBoard()
    }

    private generateBoard(): void {
        this.allocateMines();
    }

    private allocateMines() {
        for (let cantMines = 1; cantMines <= this.mines; cantMines++) {
            const posX = Math.floor((Math.random() * this.sizeY) + 1);
            const posY = Math.floor((Math.random() * this.sizeX) + 1);
            this.findMine({x: posX, y: posY}) ? cantMines-- : this.boardMines.push({x: posX, y: posY});
        }
    }

    markFlag(x, y) {
        if (x < 0 || x > this.sizeX || y < 0 || y > this.sizeY) {
            console.log('Coordenada invalida.')
        }
        this.checkWin();
    }

    checkCell(cell: Cell) {
        const {x, y} = {...cell}
        if (x < 0 || x > this.sizeX || y < 0 || y > this.sizeY || cell.x == null || cell.y == null) {
            console.log('Coordenada invalida.')
            return false;
        }

        if (this.findChecked(cell)) {
            console.log('Esta casilla ya se marco')
        } else {
            if (this.findMine(cell)) {
                console.log('Bomba! buen intento.')
                return true;
            } else {
                this.boardChecked.push({x: x, y: x})
                console.log('Bien ahi, safaste.')
            }
        }

        return this.checkWin();
    }

    private findMine(cell: Cell): boolean {
        return this.boardMines.some((mine) => mine.x === cell.x && mine.y === cell.y)
    }

    private findChecked(cell: Cell): boolean {
        return this.boardChecked.some((elem) => elem.x === cell.x && elem.y === cell.y)
    }

    private checkWin() {
        this.boardFlags.every((flag) => this.findChecked(flag))
    }

}
