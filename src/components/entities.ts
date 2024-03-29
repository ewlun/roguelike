import { Tile } from "./tiles.js";

export class Entity extends Tile {
    standingOn: Tile | undefined;
    xPos: number;
    yPos: number;

    constructor(symbol: string) {
        super(symbol, false);
        this.standingOn = undefined;

        this.xPos = -1;
        this.yPos = -1;
    }

    update() {

    }
}

class Player extends Entity {
    constructor() {
        super("@");
    }

}