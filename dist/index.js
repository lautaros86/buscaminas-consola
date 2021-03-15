"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const scanf = require("scanf");
let created = false;
let X = 0;
let Y = 0;
let M = 0;
let game;
function applyValidations() {
    let ok = true;
    if (M >= X * Y) {
        console.log('Demasiadas minas para el tablero.');
        ok = false;
    }
    return ok;
}
function loadData() {
    console.log('definir ancho: ');
    X = scanf('%d');
    console.log('definir alto: ');
    Y = scanf('%d');
    console.log('cuantas minas desea?: ');
    M = scanf('%d');
    applyValidations() ? startGame() : loadData();
}
function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        game = yield new Game_1.Game(X, Y, M);
        console.log(game.boardMines);
        let finish = false;
        const cell = { x: 0, y: 0 };
        let action;
        while (!finish) {
            console.log('elija una coordenada');
            console.log('eje X: ');
            cell.x = scanf('%d');
            console.log('eje Y: ');
            cell.y = scanf('%d');
            console.log('Se marcara la celda, si quiere marcar/desmarcar una bandera ingrese 0 (cero): ');
            action = scanf('%d');
            finish = action === 0 ? game.markFlag(cell) : game.checkCell(cell);
            action = null;
        }
    });
}
loadData();
//# sourceMappingURL=index.js.map