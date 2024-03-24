import { Field } from "./field";
import { Entity } from "./entity";

export class Player extends Entity {

    constructor(field: Field) {
        super(field, "@", 0, 0);
    }

    move(x: number, y: number) {
        this.place(".");
        this.xPos += x;
        this.yPos += y;
        this.place();
    }
}