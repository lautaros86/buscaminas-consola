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
    board: Array<Array<string>> = [];

    constructor(posX, posY, mines) {
        this.sizeX = posX;
        this.sizeY = posY;
        this.mines = mines;
        this.allocateMines();
        this.generateBoard()
    }

    toogleFlag(cell: Cell) {
        if (!this.isCellValid(cell)) {
            console.log('Coordenada invalida.')
            return false
        };
        if (this.findFlag(cell)) {
            this.boardFlags = this.boardFlags.filter((elem) => elem.x === cell.x && elem.y === cell.y);
            this.boardChecked = this.boardChecked.filter((elem) => elem.x === cell.x && elem.y === cell.y);
            this.board[cell.x][cell.y] = '#';
        } else {
            this.boardFlags.push(cell)
            this.boardChecked.push(cell)
            this.board[cell.x][cell.y] = 'F';
        }
    }

    checkCell(cell: Cell) {
        if (!this.isCellValid(cell)) {
            console.log('Coordenada invalida.')
            return false
        };
        if (this.boardChecked.length === 0) {
            if (this.findMine(cell)) {
                this.moveMine(cell);
            }
            this.markCell(cell);
            console.log('Bien ahi, safaste.')
        } else {
            if (this.findChecked(cell)) {
                console.log('Esta casilla ya se marco')
            } else {
                if (this.findMine(cell)) {
                    console.log('Bomba! buen intento.')
                    return true;
                } else {
                    this.markCell(cell);
                    console.log('Bien ahi, safaste.')
                }
            }
        }
        return this.checkWin();
    }

    moveMine(cell: Cell) {
        let moved = false;
        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                const currentCell = {x: x, y: y}
                if (!this.findMine(currentCell)) {
                    this.boardMines = this.boardMines.filter((mine) => !(mine.x === cell.x && mine.y === cell.y));
                    this.boardMines.push(currentCell)
                    moved = true;
                    break;
                }
            }
            if (moved) break;
        }
    }

    markCell(cell: Cell) {
        if (!this.isCellValid(cell)) {
            return false;
        }
        const cant = this.cellArround(cell);
        const cheked = this.findChecked(cell);
        if (cant === 0 && !cheked) {
            this.boardChecked.push(cell)
            this.board[cell.x][cell.y] = ' ';
            this.markCell({x: cell.x - 1, y: cell.y - 1})
            this.markCell({x: cell.x, y: cell.y - 1})
            this.markCell({x: cell.x + 1, y: cell.y - 1})
            this.markCell({x: cell.x - 1, y: cell.y})
            this.markCell({x: cell.x + 1, y: cell.y})
            this.markCell({x: cell.x - 1, y: cell.y + 1})
            this.markCell({x: cell.x, y: cell.y + 1})
            this.markCell({x: cell.x + 1, y: cell.y + 1})
        } else {
            if (this.isCellValid(cell) && !cheked) {
                this.boardChecked.push(cell)
                this.board[cell.x][cell.y] = (cant === 0 ? ' ' : cant.toString());
            }
        }
    }

    printMap(show: boolean = false): void {
        if (show) {
            this.showMap();
        }
        process.stdin.write('     |');
        for (let sizeX = 0; sizeX <= this.sizeX - 1; sizeX++) {
            process.stdin.write(`${sizeX} |`)
        }
        process.stdin.write('\n');
        process.stdin.write('\n');
        for (let sizeY = 0; sizeY <= this.sizeY - 1; sizeY++) {
            if (sizeY > 9) {
                process.stdin.write(`|${sizeY}| `);
            } else {
                process.stdin.write(`|${sizeY}|  `);
            }
            process.stdin.write('|');
            for (let sizeX = 0; sizeX <= this.sizeX - 1; sizeX++) {
                process.stdin.write(this.board[sizeX][sizeY] + (sizeX > 9 ? "|" : "| "));
            }
            process.stdin.write('\n');
        }
    }

    private findMine(cell: Cell): boolean {
        return this.boardMines
            .some((mine) => mine.x === cell.x && mine.y === cell.y)
    }

    private findChecked(cell: Cell): boolean {
        return this.boardChecked.some((elem) => elem.x === cell.x && elem.y === cell.y)
    }

    private findFlag(cell: Cell): boolean {
        return this.boardFlags.some((flag) => flag.x === cell.x && flag.y === cell.y)
    }

    private checkWin() {
        return this.boardChecked.length + this.boardMines.length === this.sizeX * this.sizeY
    }

    private isCellValid(cell) {
        if (cell.x < 0 || cell.x >= this.sizeX || cell.y < 0 || cell.y >= this.sizeY || cell.x == null || cell.y == null) {
            return false;
        }
        return true;
    }

    private generateBoard(): void {
        this.board = Array(this.sizeX)
            .fill([])
            .map((value) => Array(this.sizeY)
                .fill('#'));
    }

    private allocateMines() {
        for (let cantMines = 1; cantMines <= this.mines; cantMines++) {
            const posX = Math.floor((Math.random() * this.sizeX));
            const posY = Math.floor((Math.random() * this.sizeY));
            this.findMine({x: posX, y: posY}) ? cantMines-- : this.boardMines.push({x: posX, y: posY});
        }
    }

    private showMap() {
        for(let x = 0; x < this.sizeX; x++){
            for(let y = 0; y < this.sizeY; y++){
                const cell = {x:x, y:y};
                if (this.findMine(cell)) {
                    this.board[x][y] = '!';
                } else if (this.findFlag(cell)) {
                    this.board[x][y] = 'F';
                } else {
                    const cant = this.cellArround(cell);
                    this.board[x][y] = (cant > 0 ? cant.toString() : ' ');
                }
            }
        }
    }

    private cellArround(cell: Cell): number {
        let result: any = 0;
        for (const mine of this.boardMines) {
            if (
                ((mine.x - 1) === cell.x && (mine.y) === cell.y) ||
                ((mine.x + 1) === cell.x && (mine.y) === cell.y) ||
                ((mine.x) === cell.x && (mine.y - 1) === cell.y) ||
                ((mine.x) === cell.x && (mine.y + 1) === cell.y) ||
                ((mine.x + 1) === cell.x && (mine.y + 1) === cell.y) ||
                ((mine.x - 1) === cell.x && (mine.y + 1) === cell.y) ||
                ((mine.x + 1) === cell.x && (mine.y - 1) === cell.y) ||
                ((mine.x - 1) === cell.x && (mine.y - 1) === cell.y)
            ) {
                result++;
            }
        }
        return result;
    }
}
