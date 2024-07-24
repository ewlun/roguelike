import {Game} from "./components/index.js";

let game = new Game(60, 25, "hey");

game.display.render(game.currentLevel.map)

document.addEventListener("keydown", (e) => game.handleInput(e))