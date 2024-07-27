import { Tile } from "./tiles.js";

export class Display {
    readonly canvasElement: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly COLS: number;
    readonly ROWS: number;
    readonly width: number;
    readonly height: number;
    fontSize: number;

    spriteSheet: ImageBitmap | undefined;


    constructor(cols: number, rows: number) {
        this.COLS = cols;
        this.ROWS = rows;
        this.fontSize = 16;

        this.canvasElement = document.querySelector('.game') as HTMLCanvasElement;

        this.width = this.canvasElement.width = this.COLS * this.fontSize;
        this.height = this.canvasElement.height = this.ROWS * this.fontSize;

        this.ctx = this.canvasElement.getContext('2d')!;

        this.spriteSheet = undefined;

        
    
    }

    async loadImages() {
        return new Promise<void>(resolve => {
            let image = document.querySelector('#spriteSheet') as HTMLImageElement;
            image.onload = () => {
                createImageBitmap(image, 0, 0, 256, 256)!
                .then(spriteSheet => {
                    this.spriteSheet = spriteSheet;
                    resolve();
                })};
            image.src = image.src === undefined ? "/assets/cp437_16x16.png" : image.src;
        });
    }

    render(subset: Tile[][], x = 0, y = 0) {
        if(this.spriteSheet === undefined) throw new Error('Error: Spritesheet not yet loaded');
        this.ctx.fillStyle = "#000000"
        if(x === 0) 
        this.ctx.fillRect(x * this.fontSize, y * this.fontSize,
            this.width, this.height);
        else  this.ctx.fillRect(x * this.fontSize, y * this.fontSize,
            this.fontSize*subset[0].length, this.fontSize*subset.length);

        for (let i = 0; i < subset.length; i++) {
            if (i > this.ROWS) break
            for (let j = 0; j < subset[i].length; j++) {
                this.ctx.fillStyle = subset[i][j] !== undefined ? subset[i][j].color : "#000000";
                
                let char = subset[i][j].symbol.charCodeAt(0);
                let a = char % this.fontSize * this.fontSize;
                let b = Math.floor(char / this.fontSize) * this.fontSize;
                let dx = (x + j) * this.fontSize;
                let dy = (i + y) * this.fontSize;

                this.ctx.drawImage(this.spriteSheet, a, b, this.fontSize, this.fontSize, dx, dy, this.fontSize, this.fontSize);
                this.ctx.globalCompositeOperation = "darken"; // "lighten" for background
                this.ctx.fillRect(dx,dy,this.fontSize,this.fontSize);
                this.ctx.globalCompositeOperation = "source-over";
            }
        }
    }
}