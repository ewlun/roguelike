import { Tile } from "./tile.js";
export class Level {
    map: Tile[][];
    readonly HEIGHT: number;
    readonly WIDTH: number;

    constructor(height: number, width: number) {
        this.HEIGHT = height;
        this.WIDTH = width;

        this.map = new Array();
        for (let i = 0; i < this.HEIGHT; i++) {
            this.map.push(new Array(this.WIDTH));
        }

        this.map.map((x, i) => { x.fill(new Tile(i.toString()[0])) })
    }

    subset(x1: number, y1: number, x2: number, y2: number) {
        let result: Tile[][] = [];
        for (let i = x1; i < x2; i++) {
            result.push(this.map[i].slice(y1, y2));
        }
        return result;
    }
}


/**
 *    [[".00ff00", "x", "@ff0000"]]
 * 
 */