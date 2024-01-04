export class Game{
    private world: boolean[][];

    constructor(world: boolean[][]) {
        this.world = world
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
        return this.isPossibleRow(row) && this.isPossibleColum(colum) && this.world[row][colum];
    }

    shouldLive(colum: number, row: number): boolean{
        const possibleColumns  = 3;
        const possibleRows     = 3;
        let totalLiveNeighbors = 0;
        for (let actualColumn = colum - 1; actualColumn < ((colum - 1) + possibleColumns); actualColumn++) {
            for (let actualRow = row - 1; actualRow < ((row - 1) + possibleRows); actualRow++) {
                if(this.isAlive(actualRow, actualColumn) && ((row != actualRow) || (colum != actualColumn))){
                    totalLiveNeighbors++;
                }
            }
        }
        return (totalLiveNeighbors == 2 || totalLiveNeighbors == 3);
    }

    private isPossibleColum(colum: number): boolean{
        return ((colum >= 0) && (colum < this.world[0].length));
    }

    private isPossibleRow(row: number): boolean{
        return ((row >= 0) && (row < this.world.length));
    }
}