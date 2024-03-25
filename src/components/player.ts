import { Display } from "./display.js";
import { Entity } from "./entity.js";

export class Player extends Entity {

    constructor(display: Display) {
        super(display, "@", 0, 0);
    }

    move(x: number, y: number) {
        this.place(".");
        this.xPos += x;
        this.yPos += y;
        this.place();
    }
}