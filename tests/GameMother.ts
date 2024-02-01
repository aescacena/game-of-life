import {Game} from "../src/Game";
import {faker} from "@faker-js/faker";
import {Cell} from "../src/Cell";
import {CellMother} from "./CellMother";

export class GameMother{
    static create(world: Cell[][]): Game{
        return new Game(world);
    }

    static withNumberLiveCells(total: number): Game{
        const columns: number      = faker.number.int({ min: total, max: total + 2});
        const world  : Cell[][] = [];
        let rows = 0;
        let totalLive = 0;
        while (totalLive < total){
            world[rows] = [];
            for (let j = 0; j < columns; j++) {
                if(CellMother.random().isAlive() && totalLive < total){
                    totalLive++;
                    world[rows][j] = Cell.createLiveCell();
                }else {
                    world[rows][j] = Cell.createDeadCell();
                }
            }
            rows++;
        }
        return this.create(world);
    }

    static withNumberDeadCells(total: number): Game{
        const columns: number   = faker.number.int({ min: total, max: total + 2});
        const world  : Cell[][] = [];
        let rows = 0;
        let totalDead = 0;
        while (totalDead < total){
            world[rows] = [];
            for (let j = 0; j < columns; j++) {
                if(CellMother.random().isAlive() && totalDead < total){
                    totalDead++;
                    world[rows][j] = Cell.createDeadCell();
                }else {
                    world[rows][j] = Cell.createLiveCell();
                }
            }
            rows++;
        }
        return this.create(world);
    }
}