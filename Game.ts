export class Game {
    
    boardMines: Array<[number, number,]> = [];
    boardEmpty: Array<[number, number,]> = [];
    posX: number;
    posY: number;
    mines: number;

    constructor(posX, posY, mines) {
        if(mines >= posX * posY) {
            console.log('Demasiadas minas para el tablero.')
        }
        this.posX = posX;
        this.posY = posY;
        this.mines = mines;

        console.log('generando')
        this.generateBoard()
        console.log('generado')

    }

	private generateBoard(): void {
        console.log('entre al generador')
		for (let cantMines = 1; cantMines <= this.mines; cantMines++) {
			const posX = Math.floor((Math.random() * this.posY) + 1);
			const posY = Math.floor((Math.random() * this.posX) + 1);
			this.boardMines.some((mine)=> mine[0] === posX && mine[1] === posY) ?
				cantMines--
			:
			this.boardMines.push([posX, posY]);
		}
        console.log('sali al generador')
	}

}
