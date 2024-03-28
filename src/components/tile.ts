type HexColor = `#${string}`

export class Tile {
    symbol: string;
    color: HexColor;

    constructor(symbol: string, color?: HexColor) {
        this.symbol = symbol;

        this.color = color === undefined ? "#00000" : color;
    }
}