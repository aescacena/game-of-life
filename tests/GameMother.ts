import {Game} from "../src/Game";
import {faker} from "@faker-js/faker";

export class GameMother{
    static create(world: boolean[][]): Game{
        return new Game(world);
    }

    static withNumberLiveCells(total: number): Game{
        const columns: number      = faker.number.int({ min: total, max: total + 2});
        const world  : boolean[][] = [];
        let rows = 0;
        let totalLive = 0;
        while (totalLive < total){
            world[rows] = [];
            for (let j = 0; j < columns; j++) {
                const cellState = faker.number.int({min: 0, max: 1});
                if(cellState == 1 && totalLive < total){
                    totalLive++;
                    world[rows][j] = true;
                }else {
                    world[rows][j] = false;
                }
            }
            rows++;
        }
        return this.create(world);
    }

    static withNumberDeadCells(total: number): Game{
        const columns: number      = faker.number.int({ min: total, max: total + 2});
        const world  : boolean[][] = [];
        let rows = 0;
        let totalDead = 0;
        while (totalDead < total){
            world[rows] = [];
            for (let j = 0; j < columns; j++) {
                const cellState = faker.number.int({min: 0, max: 1});
                if(cellState == 0 && totalDead < total){
                    totalDead++;
                    world[rows][j] = false;
                }else {
                    world[rows][j] = true;
                }
            }
            rows++;
        }
        return this.create(world);
    }
}