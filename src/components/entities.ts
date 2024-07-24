import { Level } from "./level.js";
import { Tile, HexColor } from "./tiles.js";

export class Entity extends Tile {
    level: Level;
    standingOn: Tile;
    xPos: number;
    yPos: number;

    constructor(symbol: string, level: Level, x: number, y: number, color?: HexColor) {
        if (color)
            super(symbol, false, color);
        else super(symbol, false);
        
        this.level = level;
        this.standingOn = this.level.map[y][x];
        this.xPos = x;
        this.yPos = y;

        if (this.level.map[y][x].passable) this.level.map[y][x] = this;
    }

    move(x: number, y: number) {
        let newTile = this.level.map[this.yPos + y][this.xPos + x];
        if (newTile.passable) {
            let stand = newTile;
            this.level.map[this.yPos + y][this.xPos + x] = this;
            this.level.map[this.yPos][this.xPos] = this.standingOn;
            this.standingOn = stand;
            this.xPos += x;
            this.yPos += y;
        }
    
    }

    goTo(x: number, y: number, level?: Level) {
        if(level === undefined)
            level = this.level;
        let newTile = level.map[y][x];
        if (newTile.passable) {
            let stand = newTile;
            level.map[y][x] = this;
            this.level.map[this.yPos][this.xPos] = this.standingOn;
            this.standingOn = stand;
            this.xPos = x;
            this.yPos = y;
            this.level = level
        }
    
    }
    
    update() {

    }
}

export class Player extends Entity {
    constructor(level: Level, x: number, y: number) {
        super("@", level, x, y);
    }

}