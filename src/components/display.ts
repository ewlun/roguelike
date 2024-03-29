import { Tile } from "./tiles.js";

export class Display {
    readonly canvasElement: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly COLS: number;
    readonly ROWS: number;
    readonly width: number;
    readonly height: number;
    fontHeight: number;
    fontWidth: number;


    constructor(cols: number, rows: number) {
        this.COLS = cols;
        this.ROWS = rows;
        this.fontHeight = 20;
        this.fontWidth = this.fontHeight * 0.6;

        this.canvasElement = document.querySelector('.game') as HTMLCanvasElement;

        this.width = this.canvasElement.width = this.COLS * this.fontWidth;
        this.height = this.canvasElement.height = this.ROWS * this.fontHeight;

        this.ctx = this.canvasElement.getContext('2d')!;
        this.ctx.font = `${this.fontHeight}px Courier New`;
    }

    render(subset: Tile[][], x = 0, y = 0) {
        this.ctx.clearRect(x * this.fontWidth, y * this.fontHeight,
            subset.length * this.fontWidth, subset[0].length * this.fontHeight);

        for (let i = 0; i < subset[0].length; i++) {
            if (i > this.ROWS) break
            let string = "";
            for (let j = 0; j < subset.length; j++) {
                if (j > this.COLS) break;
                else string += subset[j][i].symbol;
            }
            this.ctx.fillText(string, x * this.fontHeight * 0.6, (i + y + 1) * this.fontHeight);
        }

    }
}