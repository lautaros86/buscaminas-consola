import { Game } from "./Game"
import * as scanf from 'scanf';

let X = 0;
let Y = 0;
let M = 0;
let game;

function applyValidations() {
    let ok = true;
    if (M >= X * Y) {
        console.log('Demasiadas minas para el tablero.')
        ok = false;
    }
    return ok;
}

function loadData() {
    console.log('definir ancho: ')
    X = scanf('%d')
    console.log('definir alto: ')
    Y = scanf('%d')
    console.log('cuantas minas desea?: ')
    M = scanf('%d')
    applyValidations() ? startGame() : loadData();
}

// create game
async function startGame() {
    game = await new Game(X, Y, M)
    let finish = false;
    while (!finish) {
        game.printMap()
        const cell = { x: 0, y: 0 }
        let action: number;
        console.log('elija una coordenada')
        console.log('eje X: ')
        cell.x = scanf('%d')
        console.log('eje Y: ')
        cell.y = scanf('%d')
        console.log('Se marcara la celda, si quiere marcar/desmarcar una bandera ingrese 0 (cero): ')
        action = scanf('%d')
        finish = action === 0 ? game.toogleFlag(cell) : game.checkCell(cell);
        action = null;
    }
    if(finish) console.log("felicidades!")
}

loadData();

// function sarasa (){
//     var minesArr = Array(10).fill(-1);
//     var aux = Array(5 * 5 - 10).fill(0);
//     aux = aux.concat(minesArr);
//     aux = aux.sort(() => Math.random() - 0.5);
//     console.log(aux)
// var slice;
// for (let i = 0; i < rows; i++) {
//   slice = aux.slice(i * rows, i * rows + cols);
//   board[i] = slice;
// }
// }

