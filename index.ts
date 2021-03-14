import { Game } from "./Game"

// create game
async function startGame() {
    const game = await new Game(10, 15, 20)
    console.log(game.boardMines)
}

startGame()

