import {Game} from "./components/index.js";

declare global {
    let game: Game;
}

game = new Game(42, 25);

game.display.loadImages().then(() => {  
    game.drawLevel();
    
    document.addEventListener("keydown", (e) => game.handleInput(e))
})