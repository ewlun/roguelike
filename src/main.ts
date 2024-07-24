import { Display, Game, Level, Player } from "./components/index.js";

let game = new Game(60, 25, "hello world");

game.display.render(game.startLevel.map)

document.addEventListener("keydown", (e) => game.takeInput(e))