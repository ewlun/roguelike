import { Display } from "./display";
import { Player } from "./entities";
import { Level } from "./level";
import { DownStair, Tile, UpStair } from "./tiles";

export class Game {
    readonly WIDTH: number;
    readonly HEIGHT: number;
    seed: number;
    turn: number;
    display: Display
    currentLevel: Level;
    levels: Level[];
    player: Player
    
    constructor(w: number, h: number, seed?: string) {
        this.WIDTH = w;
        this.HEIGHT = h;

        if(seed !== undefined) {
            this.seed = this.cyrb128(seed)[0];
        } 
        else this.seed = (Math.random()*2**32)>>>0

        this.turn = 0;

        this.display = new Display(w, h)
        
        this.levels = [new Level(this, this.display.COLS, this.display.ROWS)];
        this.currentLevel = this.levels[0];
        this.currentLevel.generateRandomWalk();
        
        this.player = new Player(this.currentLevel, ...this.currentLevel.startPos);
    }

    handleInput(e: KeyboardEvent): void {
            let moveX = 0;
            let moveY = 0;
            switch (e.key) {
                case "l":
                    moveX = 1;
                    break;
                case "h":
                    moveX = -1;
                    break;
                case "j":
                    moveY = 1;
                    break;
                case "k":
                    moveY = -1;
                    break;
                case "y":
                    moveY = -1;
                    moveX = -1;
                    break;
                case "n":
                    moveY = 1;
                    moveX = 1;
                    break;
                case "u":
                    moveY = -1;
                    moveX = 1;
                    break;
                case "b":
                    moveY = 1;
                    moveX = -1;
                    break;
                case ">":
                    if(this.player.standingOn instanceof DownStair) {
                        if(this.levels.at(-1) === this.currentLevel) {
                            this.levels.push(new Level(this, this.WIDTH, this.HEIGHT))
                            this.currentLevel = this.levels.at(-1)!;
                            this.currentLevel.generateRandomWalk();
                            this.player.goTo(...this.currentLevel.startPos, this.currentLevel);
                        }
                        else {
                            let index = this.levels.indexOf(this.currentLevel) + 1;
                            this.currentLevel = this.levels[index];
                            this.player.goTo(...this.currentLevel.startPos, this.currentLevel);
                        }
                    }
                    break;
                case "<":
                    if(this.player.standingOn instanceof UpStair) {
                        let index = this.levels.indexOf(this.currentLevel) - 1;
                        this.currentLevel = this.levels[index];
                        this.player.goTo(...this.currentLevel.endPos, this.currentLevel);
                    }
                    break;

                default:
                    return;
            }
        
            if (moveX !== 0 || moveY !== 0) this.player.move(moveX, moveY);
        
            this.currentLevel.entities.forEach(entity => {
                entity.update();
            });
            this.drawLevel();
    }

    drawLevel(): void {
        this.display.render(this.currentLevel.map);
    }

    drawMessageBox(message: string, x: number, y: number): void {
        let chars = message.split('');
        let splitArr = message.split('\n');
        let cols = Math.max(...(splitArr.map(el => el.length)));

        let box: Tile[][] = new Array();
        let rows = chars.filter((x) => x === "\n").length;

        for(let i = 0; i <= rows; i++) {
            box.push(new Array<Tile>(cols));
        }
        
        splitArr.forEach((row, index) => {
            for(let i = 0; i < row.length; i++) {
                box[index][i] = new Tile(row[i], false);
            }
        });
        
        this.display.render(box, x, y);
    }

    random(): number {
        let a = this.seed++;
          a |= 0;
          a = a + 0x9e3779b9 | 0;
          let t = a ^ a >>> 16;
          t = Math.imul(t, 0x21f0aaad);
          t = t ^ t >>> 15;
          t = Math.imul(t, 0x735a2d97);
          return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
       }

    private cyrb128(str: string) {
        let h1 = 1779033703, h2 = 3144134277,
            h3 = 1013904242, h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
        return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
    }
}