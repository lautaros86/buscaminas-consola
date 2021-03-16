import * as figlet from 'figlet';

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
    board: Array<Array<string>>;

    constructor(posX, posY, mines) {
        this.sizeX = posX;
        this.sizeY = posY;
        this.mines = mines;
        this.generateBoard()
    }

    private generateBoard(): void {
        this.allocateMines();
        this.board = Array(this.sizeX)
            .fill([])
            .map(()=>Array(this.sizeY)
                .fill(this.setIcon(this.sizeX, this.sizeY, false)))
    }

    private allocateMines() {
        for (let cantMines = 1; cantMines <= this.mines; cantMines++) {
            const posX = Math.floor((Math.random() * this.sizeY) + 1);
            const posY = Math.floor((Math.random() * this.sizeX) + 1);
            this.findMine({ x: posX, y: posY }) ? cantMines-- : this.boardMines.push({ x: posX, y: posY });
        }
    }

    toogleFlag(cell: Cell) {
        if (!this.isCellValid(cell)) return false;
        if (this.findFlag(cell)) {
            this.boardFlags = this.boardFlags.filter((elem) => elem.x === cell.x && elem.y === cell.y);
            this.boardChecked = this.boardChecked.filter((elem) => elem.x === cell.x && elem.y === cell.y);
        } else {
            this.boardFlags.push(cell)
            this.boardChecked.push(cell)
        }

    }

    checkCell(cell: Cell) {
        if (!this.isCellValid(cell)) {
            return false;
        }
        if (this.findChecked(cell)) {
            console.log('Esta casilla ya se marco')
        } else {
            if (this.findMine(cell)) {
                console.log('Bomba! buen intento.')
                return true;
            } else {
                this.boardChecked.push({ x: cell.x, y: cell.y })
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

    private findFlag(cell: Cell): boolean {
        return this.boardFlags.some((flag) => flag.x === cell.x && flag.y === cell.y)
    }

    private checkWin() {
        this.boardFlags.every((flag) => this.findChecked(flag))
    }

    private isCellValid(cell) {
        if (cell.x < 0 || cell.x > this.sizeX || cell.y < 0 || cell.y > this.sizeY || cell.x == null || cell.y == null) {
            console.log('Coordenada invalida.')
            return false;
        }
        return true;
    }

    printMap(finish: boolean = false): void {
        process.stdin.write('     |');
        for (let sizeX = 1; sizeX <= this.sizeX; sizeX++) {
            process.stdin.write(`${sizeX}|`)
        }

        process.stdin.write('\n');
        process.stdin.write('\n');
        for (let sizeY = 1; sizeY <= this.sizeY; sizeY++) {
            if (sizeY > 9) {
                process.stdin.write(`|${sizeY}| `);
            } else {
                process.stdin.write(`|${sizeY}|  `);
            }
            process.stdin.write('|');
            for (let sizeX = 1; sizeX <= this.sizeX; sizeX++) {
                let icon = this.setIcon(sizeX, sizeY, finish)
                process.stdin.write(icon + (sizeX > 9 ? "|" : " |"));
                if (icon === ' ') {

                }
            }
            process.stdin.write('\n');
        }
        console.log(this.board)
    }

    private setIcon(x: number, y: number, boom: boolean): string {
        let icon = '#';
        let data;
        if (boom) {
            data = this.boardMines;
        } else {
            data = this.boardChecked;
        }
        for (const cell of data) {
            if (cell.x === x && cell.y === y) {
                if (boom) {
                    icon = '!';
                } else if (this.findFlag(cell)) {
                    icon = 'F';
                } else {
                    icon = this.quantityAroundOfCell(cell);
                }
            }
        }

        return icon;
    }

    quantityAroundOfCell(cell: Cell): string {
        let result: any = 0;
        for (const mine of this.boardMines) {
            if (
                ((mine.x - 1) === cell.y && (mine.y) === cell.x) ||
                ((mine.x + 1) === cell.y && (mine.y) === cell.x) ||
                ((mine.x) === cell.y && (mine.y - 1) === cell.x) ||
                ((mine.x) === cell.y && (mine.y + 1) === cell.x) ||
                ((mine.x + 1) === cell.y && (mine.y + 1) === cell.x) ||
                ((mine.x - 1) === cell.y && (mine.y + 1) === cell.x) ||
                ((mine.x + 1) === cell.y && (mine.y - 1) === cell.x) ||
                ((mine.x - 1) === cell.y && (mine.y - 1) === cell.x)
            ) {
                result++;
            }
        }
        if (result == 0) {
            result = ' ';
        }
        return result.toString();
    }
}
