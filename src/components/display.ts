export class Display {
    readonly gameCont: HTMLDivElement;
    readonly COLS: number;
    readonly ROWS: number;
    content: String[][];

    constructor(cols: number, rows: number) {
        this.COLS = cols;
        this.ROWS = rows;

        this.content = new Array();
        for (let i = 0; i < this.COLS; i++) {
            this.content.push(new Array(this.ROWS));
        }

        this.gameCont = document.querySelector('.game') as HTMLDivElement;

        this.gameCont.style.fontFamily = "monospace";

        this.gameCont.style.width = this.COLS.toString() + "ch";
        this.gameCont.style.height = (this.ROWS * 2.1428).toString() + "ch"; // Typsnittet är 15/7 ggr längre än det är brett

        this.gameCont.style.overflowWrap = "anywhere";
        this.gameCont.style.overflow = "hidden";
        this.gameCont.style.padding = "0";
    }

    render(subset: string[][]) {
        this.gameCont.textContent = "";
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLS; j++) {
                if (j < subset.length && subset[j][i] !== undefined)
                    this.gameCont.textContent += subset[j][i];
                else this.gameCont.textContent += ".";
            }
        }
    }
}