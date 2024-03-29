type HexColor = `#${string}`

export class Tile {
    symbol: string;
    color: HexColor;
    passable: boolean;

    constructor(symbol: string, passable: boolean, color?: HexColor) {
        this.symbol = symbol;
        this.passable = passable;

        this.color = color === undefined ? "#000000" : color;
    }
}

export class EmptyTile extends Tile {
    constructor() {
        super(".", true, "#888888");
    }
}

export class UnknownTile extends Tile {
    constructor() {
        super(" ", false);
    }
}

export class Wall extends Tile {
    constructor() {
        super("#", false);
    }
}

export class Path extends Tile {
    constructor() {
        super("▒", false);
    }
}