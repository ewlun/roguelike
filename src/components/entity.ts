import { Display } from "./display";

export class Entity {
    symbol: string;
    xPos: number;
    yPos: number;
    display: Display;

    constructor(display: Display, symbol: string, xPos?: number, yPos?: number) {
        this.symbol = symbol;
        this.display = display;

        if (xPos === undefined || yPos === undefined) {
            this.xPos = -1;
            this.yPos = -1;
        }
        else {
            this.xPos = xPos;
            this.yPos = yPos;
        }
    }

    place(s?: string) {
        this.display.content[this.xPos][this.yPos] = s === undefined ? this.symbol : s;
    }
}