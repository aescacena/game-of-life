import {Cell} from "./Cell";
import {CellState} from "./CellState";

export class Game{
    private world: Cell[][];

    constructor(world: Cell[][]) {
        this.world = world
    }

    static createAllDead(rows: number, columns: number) {
        let world: Cell[][] = Array(rows).fill([]).map(() => Array(columns).fill(Cell.createDeadCell()));
        return new Game(world);
    }

    addCellLive(row: number, colum: number): void{
        if(this.isPossiblePosition(row, colum)){
            this.world[row][colum] = Cell.createLiveCell();
        }
    }

    addCellDead(row: number, colum: number): void{
        if(this.isPossiblePosition(row, colum)){
            this.world[row][colum] = Cell.createDeadCell();
        }
    }

    actualState(): Cell[][]{
        return this.world;
    }

    evolves(): void{
        const newState: Game = Game.createAllDead(this.world.length, this.world[0].length);
        for (let row = 0; row < this.world.length; row++) {
            for (let column = 0; column < this.world[0].length; column++){
                if(this.isDead(row, column)){
                    if(this.shouldRevive(row, column)){
                        newState.addCellLive(row, column);
                    }
                }else {
                    if(this.shouldDead(row, column)){
                        newState.addCellDead(row, column);
                    }else {
                        newState.addCellLive(row, column);
                    }
                }
            }
        }
        this.world = newState.world;
    }

    getTotalLiveCells(): number{
        let totalLiveNeighbors = 0;
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[i].length; j++) {
                if(this.isAlive(i, j)){
                    totalLiveNeighbors++;
                }
            }
        }
        return totalLiveNeighbors;
    }

    getTotalDeadCells(): number{
        let totalLiveNeighbors = 0;
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[i].length; j++) {
                if(this.isAlive(i, j)){
                    totalLiveNeighbors++;
                }
            }
        }
        return totalLiveNeighbors;
    }

    private isAlive(row: number, colum: number): boolean{
        return this.isPossiblePosition(row, colum) && this.cell(row, colum).isAlive();
    }

    private isDead(row: number, colum: number): boolean{
        return this.isPossiblePosition(row, colum) && this.cell(row, colum).isDead();
    }

    shouldRevive(row: number, colum: number): boolean{
        return this.totalLivingNeighbors(row, colum) == 3;
    }

    shouldDead(row: number, colum: number): boolean{
        const totalLiveNeighbors = this.totalLivingNeighbors(row, colum);
        return (totalLiveNeighbors < 2 || totalLiveNeighbors > 3);
    }

    private totalLivingNeighbors(row: number, colum: number){
        const possibleColumns    = 3;
        const possibleRows       = 3;
        let   totalLiveNeighbors = 0;
        for (let actualRow = row - 1; actualRow < ((row - 1) + possibleRows); actualRow++){
             for (let actualColumn = colum - 1; actualColumn < ((colum - 1) + possibleColumns); actualColumn++) {
                 if(this.isAlive(actualRow, actualColumn) && ((row != actualRow) || (colum != actualColumn))){
                     totalLiveNeighbors++;
                 }
             }
        }
        return totalLiveNeighbors;
    }

    private isPossibleColum(colum: number): boolean{
        return ((colum >= 0) && (colum < this.world[0].length));
    }

    private isPossibleRow(row: number): boolean{
        return ((row >= 0) && (row < this.world.length));
    }

    private isPossiblePosition(row: number, colum: number) {
        return this.isPossibleRow(row) && this.isPossibleColum(colum);
    }

    private cell(row: number, colum: number): Cell{
        return this.world[row][colum];
    }
}