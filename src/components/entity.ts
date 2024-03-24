import { Field } from "./field";

export class Entity {
    symbol: string;
    xPos: number;
    yPos: number;
    field: Field;

    constructor(field: Field, symbol: string, xPos?: number, yPos?: number) {
        this.symbol = symbol;
        this.field = field;

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
        this.field.content[this.xPos][this.yPos] = s === undefined ? this.symbol : s;
    }
}