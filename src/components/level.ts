import { Game } from "./game.js";
import { EmptyTile, Path, Tile, UnknownTile, Wall } from "./tiles.js";

export class Level {
    map: Tile[][];
    startPos: [number, number];
    readonly HEIGHT: number;
    readonly WIDTH: number;
    private game: Game;

    constructor(game: Game, width: number, height: number) {
        this.game = game;
        this.HEIGHT = height;
        this.WIDTH = width;
        this.startPos = [0,0];

        this.map = new Array();
        for (let i = 0; i < this.HEIGHT; i++) {
            this.map.push(new Array(this.WIDTH));
        }

        this.map.map((x, i) => { x.fill(new EmptyTile()) });
    }

    generateRandomWalk(): void {
        this.map.map((x) => { x.fill(new Wall()) });

        let posX = Math.floor(this.game.random() * this.WIDTH);
        let posY = Math.floor(this.game.random() * this.HEIGHT);
        this.startPos = [posX, posY];

        this.map[posY][posX] = new EmptyTile();

        let tiles = 0;
        
        while(tiles < this.HEIGHT * this.WIDTH * 0.5) {
            let ranX = Math.floor(this.game.random() * 3) - 1;
            let ranY = Math.floor(this.game.random() * 3) - 1;
            
            posX += ranX + posX >= this.WIDTH || ranX + posX < 0 ? -ranX : ranX
            posY += ranY + posY >= this.HEIGHT || ranY + posY < 0 ? -ranY : ranY
            
            if(this.map[posY][posX] instanceof Wall) {
                this.map[posY][posX] = new EmptyTile();
                tiles++
            }
        }

    }

    generateTestLevel(): void {
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
    }

    subset(x1: number, y1: number, x2: number, y2: number): Tile[][] {
        let result: Tile[][] = [];
        for (let i = y1; i < y2; i++) {
            result.push(this.map[i].slice(x1, x2));
        }
        return result;
    }
}



