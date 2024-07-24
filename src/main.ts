import {Game} from "./components/index.js";

declare global {
    let game: Game;
}

game = new Game(60, 25);

game.drawLevel();

document.addEventListener("keydown", (e) => game.handleInput(e))