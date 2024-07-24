import { EmptyTile, Path, Tile, UnknownTile, Wall } from "./tiles.js";
export class Level {
    map: Tile[][];
    readonly HEIGHT: number;
    readonly WIDTH: number;

    constructor(width: number, height: number) {
        this.HEIGHT = height;
        this.WIDTH = width;

        this.map = new Array();
        for (let i = 0; i < this.HEIGHT; i++) {
            this.map.push(new Array(this.WIDTH));
        }

        const level =
            `........................................
........................................
....##########..........................
....#,,,,,,,,##########.................
....#,,,,,,,,,,,,,,,,,#.................
....#################,#.................
....................#,#.................
....................#,#.................
............#########,#########.........
............#,,,,,,,,,,,,,,,,,#.........
............#,,,,,,,,,,,,,,,,,#.........
............#,,,,,,,,,,,,,,,,,#.........
............###################.........
........................................
........................................`;

        // this.map.map((x, i) => { x.fill(new EmptyTile()) })

        this.map.forEach((element, index) => {
            for (let i = 0; i < 40; i++) {
                let char = level[i + index * 41];
                if (char === ",")
                    element[i] = new EmptyTile();
                else if (char === "#") element[i] = new Wall();
                else if (char === "-") element[i] = new Path();
                else element[i] = new UnknownTile();
            }
        });

        // let randX = Math.floor(Math.random() * (this.WIDTH));
        // let randY = Math.floor(Math.random() * (this.HEIGHT));

        // console.log(randY, randX)
        // for()
        // this.map[randY][randX] = new Wall();

    }

    subset(x1: number, y1: number, x2: number, y2: number) {
        let result: Tile[][] = [];
        for (let i = y1; i < y2; i++) {
            result.push(this.map[i].slice(x1, x2));
        }
        return result;
    }
}



