import { Level } from "./level.js";
import { Tile, HexColor } from "./tiles.js";


type Stats = {
    symbol: string,
    health: number,
    attack: number,
    defence: number,
};


export class Entity extends Tile {
    level: Level;
    standingOn: Tile;
    xPos: number;
    yPos: number;
    health: number;
    attack: number;
    defence: number;

    constructor(stats: Stats, level: Level, x: number, y: number, color?: HexColor) {
        if (color)
            super(stats.symbol, false, color);
        else super(stats.symbol, false);
        
        this.health = stats.health;
        this.attack = stats.attack;
        this.defence = stats.defence;

        this.level = level;
        this.standingOn = this.level.map[y][x];
        this.xPos = x;
        this.yPos = y;

        if (this.level.map[y][x].passable) this.level.map[y][x] = this;
        else throw new Error("Error: Can't create entity at specified location");
    }

    move(x: number, y: number): void {
        let newTile = this.level.map[this.yPos + y][this.xPos + x];
        if (newTile.passable) {
            let stand = newTile;
            this.level.map[this.yPos + y][this.xPos + x] = this;
            this.level.map[this.yPos][this.xPos] = this.standingOn;
            this.standingOn = stand;
            this.xPos += x;
            this.yPos += y;
        }
        else {
            this.interact(newTile);
        }
    
    }

    goTo(x: number, y: number, level?: Level): void {
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

    interact(tile: Tile): void {
        tile
    }
    
    update() {
        if(this.health <= 0) {
            this.level.map[this.yPos][this.xPos] = this.standingOn;
            this.level.entities.splice(this.level.entities.indexOf(this));
        }
    }
}

export class Player extends Entity {
    constructor(level: Level, x: number, y: number) {
        super({
            symbol: "@",
            health: 100,
            attack: 10,
            defence: 2
        }, level, x, y);
    }

    interact(tile: Tile): void {
        if(tile instanceof Entity) {
            tile.health -= this.attack - tile.defence; // assert attack > defence
        }
    }
}

export class Dummy extends Entity {
    constructor(level: Level, x:number, y:number) {
        super({
            symbol: "D",
            health: 50,
            attack: 0,
            defence: 0
        }, level, x, y, "#ff0000");
    }
}