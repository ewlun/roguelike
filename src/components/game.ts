import { Display } from "./display";
import { Player } from "./entities";
import { Level } from "./level";

export class Game {
    seed: number;
    turn: number;
    display: Display
    startLevel: Level;
    levels: Level[];
    player: Player
    
    constructor(w: number, h: number, seed?: string) {
        if(seed !== undefined) {
            this.seed = this.cyrb128(seed)[0];
        } 
        else this.seed = (Math.random()*2**32)>>>0

        this.turn = 0;

        this.display = new Display(w, h)
        
        this.startLevel = new Level(this, this.display.COLS, this.display.ROWS);
        this.startLevel.generateRandomWalk();
        this.levels = [this.startLevel];
        
        this.player = new Player(this.startLevel, ...this.startLevel.startPos);
    }

    takeInput(e: KeyboardEvent): void {
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
            }
        
            if (moveX !== 0 || moveY !== 0) this.player.move(moveX, moveY);
        
            this.display.render(this.startLevel.map);
    }

    newLevel(): void {

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