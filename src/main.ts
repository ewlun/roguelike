import { Field, Player } from "./components/index.js";

let field = new Field(50, 15);

let player = new Player(field)

player.xPos = 1;
player.yPos = 1;

player.place();

field.drawField();


document.addEventListener("keydown", (e) => {
    let moveX = 0;
    let moveY = 0;
    switch (e.key) {
        case "l":
            moveX = 1;
            break;
        case "h":
            moveX = -1;
            break;
        case "j":
            moveY = 1;
            break;
        case "k":
            moveY = -1;
            break;
        case "y":
            moveY = -1;
            moveX = -1;
            break;
        case "n":
            moveY = 1;
            moveX = 1;
            break;
        case "u":
            moveY = -1;
            moveX = 1;
            break;
        case "b":
            moveY = 1;
            moveX = -1;
            break;
    }

    player.move(moveX, moveY);

    field.drawField();
})