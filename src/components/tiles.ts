export type HexColor = `#${string}`

export class Tile {
    symbol: string;
    color: HexColor;
    passable: boolean;

    constructor(symbol: string, passable: boolean, color?: HexColor) {
        this.symbol = symbol;
        this.passable = passable;

        this.color = color === undefined ? "#CCCCCC" : color;
    }
}

export class EmptyTile extends Tile {
    constructor() {
        super(".", true, "#999999");
    }
}

export class UnknownTile extends Tile {
    constructor() {
        super(" ", false);
    }
}

export class UpStair extends Tile {
    constructor() {
        super("<", true);
    }
}

export class DownStair extends Tile {
    constructor() {
        super(">", true);
    }
}

export class Wall extends Tile {
    constructor() {
        super("#", false);
    }
}

export class Path extends Tile {
    constructor() {
        super("▒", true);
    }
}