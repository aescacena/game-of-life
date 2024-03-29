import {GameMother} from "./GameMother";
import {faker} from "@faker-js/faker";
import {Cell} from "../src/Cell";

describe("Game of life", () => {
    describe("State cells", () => {
        it("Should revive that cell because have 3 neighbors", () =>{
            // Arrange
            const world = [
                [Cell.createDeadCell(), Cell.createLiveCell() , Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell() , Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createLiveCell() , Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const game = GameMother.create(world);

            // Act
            const cellState = game.shouldRevive(1, 0);

            // Assert
            expect(cellState).toBeTruthy();
        });

        it("Should dead that cell", () =>{
            // Arrange
            const world = [
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createLiveCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const game = GameMother.create(world);

            // Act
            const cellState = game.shouldDead(2, 0);

            // Assert
            expect(cellState).toBeTruthy();
        });

        it("Should obtain 20 live cells", () =>{
            // Arrange
            const liveCellsExpect = 20;
            const game            = GameMother.withNumberLiveCells(liveCellsExpect);

            // Act
            const numberLiveCells = game.getTotalLiveCells();

            // Assert
            expect(liveCellsExpect).toEqual(numberLiveCells);
        });

        it("Should obtain 20 dead cells", () =>{
            // Arrange
            const deadCellsExpect = 20;
            const game            = GameMother.withNumberLiveCells(deadCellsExpect);

            // Act
            const numberLiveCells = game.getTotalDeadCells();

            // Assert
            expect(deadCellsExpect).toEqual(numberLiveCells);
        });
    });

    describe("State game", () => {
        it("should obtain state with all cells dead, because living cells have no neighbors", () =>{
            // Arrange
            const world = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createLiveCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const worldExpect = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const game = GameMother.create(world);

            // Act
            game.evolves();

            // Assert
            expect(worldExpect).toEqual(game.actualState());
        });

        it("should obtain state with all cells dead, because living cells only have 1 neighbor", () =>{
            // Arrange
            const world = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createLiveCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const worldExpect = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]
            ];
            const game = GameMother.create(world);

            // Act
            game.evolves();

            // Assert
            expect(worldExpect).toEqual(game.actualState());
        });

        it("should obtain same state, because all cells have 3 neighbors", () =>{
            // Arrange
            const world = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createLiveCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createLiveCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const worldExpect = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createLiveCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createLiveCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const game = GameMother.create(world);
            const numberEvolves = faker.number.int({min: 2, max: 10});

            // Act
            for (let i = 0; i < numberEvolves; i++) {
                game.evolves();
            }

            // Assert
            expect(worldExpect).toEqual(game.actualState());
        });

        it("should obtain sames states", () =>{
            // Arrange
            const firstState = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createLiveCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const secondState = [
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createLiveCell(), Cell.createLiveCell(), Cell.createLiveCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()],
                [Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell(), Cell.createDeadCell()]];
            const game = GameMother.create(firstState);

            // Act

            // Assert
            for (let i = 0; i < 4; i++) {
                game.evolves();
                if((i % 2) == 0){
                    expect(secondState).toEqual(game.actualState());
                }else {
                    expect(firstState).toEqual(game.actualState());
                }
            }
        });
    });
})