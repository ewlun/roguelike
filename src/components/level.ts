import { EmptyTile, Path, Tile, UnknownTile, Wall } from "./tiles.js";
export class Level {
    map: Tile[][];
    readonly HEIGHT: number;
    readonly WIDTH: number;

    constructor(height: number, width: number) {
        this.HEIGHT = height;
        this.WIDTH = width;

        this.map = new Array();
        for (let i = 0; i < this.WIDTH; i++) {
            this.map.push(new Array(this.HEIGHT));
        }

        const level =
            `........................................
........................................
....##########..........................
....#,,,,,,,,#..........................
....#,,,,,,,,---------..................
....##########.......-..................
.....................-..................
.....................-..................
............#########-#########.........
............#,,,,,,,,,,,,,,,,,#.........
............#,,,,,,,,,,,,,,,,,#.........
............#,,,,,,,,,,,,,,,,,#.........
............###################.........
........................................
........................................`;

        // this.map.map((x, i) => { x.fill(new Tile(i.toString()[0])) })

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

        console.log(this.map)
    }

    subset(x1: number, y1: number, x2: number, y2: number) {
        let result: Tile[][] = [];
        for (let i = y1; i < y2; i++) {
            result.push(this.map[i].slice(x1, x2));
        }
        return result;
    }
}



