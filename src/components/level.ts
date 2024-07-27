import { Dummy, Entity } from "./entities.js";
import { Game } from "./game.js";
import { DownStair, EmptyTile, Path, Tile, UnknownTile, UpStair, Wall } from "./tiles.js";

export class Level {
    private game: Game;
    readonly HEIGHT: number;
    readonly WIDTH: number;
    map: Tile[][];
    startPos: [number, number];
    endPos: [number, number];
    entities: Entity[];

    constructor(game: Game, width: number, height: number) {
        this.game = game;
        this.HEIGHT = height;
        this.WIDTH = width;
        this.startPos = [0,0];
        this.endPos = [0,0];
        this.entities = [];

        this.map = new Array();
        for (let i = 0; i < this.HEIGHT; i++) {
            this.map.push(new Array(this.WIDTH));
        }

        this.map.map((x) => { x.fill(new EmptyTile()) });
    }

    generateRandomWalk(): void {
        this.map.map((x) => { x.fill(new Wall()) });

        let posX = Math.floor(this.game.random() * this.WIDTH);
        let posY = Math.floor(this.game.random() * this.HEIGHT);
        this.startPos = [posX, posY];

        this.map[posY][posX] = new UpStair();

        let tiles = 0;
        const directions = [[1,0],[-1,0], [0,1],[0,-1]];
        
        while(tiles < this.HEIGHT * this.WIDTH * 0.5) {
            let rand = directions[Math.floor(this.game.random() * 4)];
            
            posX += rand[0] + posX >= this.WIDTH || rand[0] + posX < 0 ? -rand[0] : rand[0]
            posY += rand[1] + posY >= this.HEIGHT || rand[1] + posY < 0 ? -rand[1] : rand[1]
            
            if(this.map[posY][posX] instanceof Wall) {
                this.map[posY][posX] = new EmptyTile();
                tiles++
            }
        }

    this.map[posY][posX] = new DownStair();
    this.endPos = [posX, posY];
    
    let monsters = 0;
    while(monsters < 5) {
        let posX = Math.floor(this.game.random() * this.WIDTH);
        let posY = Math.floor(this.game.random() * this.HEIGHT);
        if (this.map[posY][posX] instanceof Wall) continue
        this.map[posY][posX] = new EmptyTile();
        this.map[posY][posX] = new Dummy(this, posX, posY);
        this.entities.push(this.map[posY][posX] as Entity);
        monsters++;
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



