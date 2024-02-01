import {CellState} from "./CellState";


export class Cell{
    private readonly state: CellState;

    private constructor(state: CellState) {
        this.state = state;
    }

    static createLiveCell(){
        return new Cell(CellState.Live);
    }

    static createDeadCell(){
        return new Cell(CellState.Dead);
    }

    isAlive(): boolean{
        return this.state === CellState.Live;
    }

    isDead(): boolean{
        return this.state === CellState.Dead;
    }

    evolves(neighbours: number): Cell{
        if(this.isAlive() && this.shouldDead(neighbours)){
            return Cell.createDeadCell();
        }
        if(this.isDead() && this.shouldRevive(neighbours)){
            return Cell.createLiveCell();
        }
        return this;
    }

    private shouldDead(neighbours: number): boolean{
        return (neighbours < 2 || neighbours > 3);
    }

    private shouldRevive(neighbours: number): boolean{
        return neighbours == 3;
    }
}