import { Display, Level, Player } from "./components/index.js";

let display = new Display(40, 15);

let level = new Level(40, 15);

let player = new Player(level, 7, 4)

display.render(level.map);


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

    if (moveX !== 0 || moveY !== 0) player.move(moveX, moveY);

    display.render(level.map);
})