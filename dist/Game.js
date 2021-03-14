"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(posX, posY, mines) {
        this.boardMines = [];
        this.boardEmpty = [];
        if (mines >= posX * posY) {
            console.log('Demasiadas minas para el tablero.');
        }
        this.posX = posX;
        this.posY = posY;
        this.mines = mines;
        console.log('generando');
        this.generateBoard();
        console.log('generado');
    }
    generateBoard() {
        console.log('entre al generador');
        for (let cantMines = 1; cantMines <= this.mines; cantMines++) {
            const posX = Math.floor((Math.random() * this.posY) + 1);
            const posY = Math.floor((Math.random() * this.posX) + 1);
            this.boardMines.some((mine) => mine[0] === posX && mine[1] === posY) ?
                cantMines--
                :
                    this.boardMines.push([posX, posY]);
        }
        console.log('sali al generador');
    }
}
exports.Game = Game;
