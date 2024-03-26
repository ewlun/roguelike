import { Display, Player, Level } from "./components/index.js";

let display = new Display(50, 15);

let level = new Level(70, 70);

let player = new Player(display)

player.xPos = 1;
player.yPos = 1;

// player.place();

display.render(level.subset(0, 0, 40, 15), 0, 0);
display.render(level.subset(0, 0, 10, 15), 40, 0);


// document.addEventListener("keydown", (e) => {
//     let moveX = 0;
//     let moveY = 0;
//     switch (e.key) {
//         case "l":
//             moveX = 1;
//             break;
//         case "h":
//             moveX = -1;
//             break;
//         case "j":
//             moveY = 1;
//             break;
//         case "k":
//             moveY = -1;
//             break;
//         case "y":
//             moveY = -1;
//             moveX = -1;
//             break;
//         case "n":
//             moveY = 1;
//             moveX = 1;
//             break;
//         case "u":
//             moveY = -1;
//             moveX = 1;
//             break;
//         case "b":
//             moveY = 1;
//             moveX = -1;
//             break;
//     }

//     player.move(moveX, moveY);

//     display.render(level.map);
// })