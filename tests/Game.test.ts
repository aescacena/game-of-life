import {GameMother} from "./GameMother";

describe("Game of life", () => {
    it("Should live that cell", () =>{
        // Arrange
        const world = [
            [false, true , false, false],
            [false, true , false, false],
            [true , false, false, false],
            [false, false, false, false]
        ];
        const game = GameMother.create(world);

        // Act
        const cellState = game.shouldLive(1, 1);

        // Assert
        expect(cellState).toBeTruthy();
    });

    it("Should dead that cell", () =>{
        // Arrange
        const world = [
            [false, true , false, false],
            [false, true, false, false ],
            [true , false, false, false],
            [false, false, false, false]
        ];
        const game = GameMother.create(world);

        // Act
        const cellState = game.shouldLive(0, 2);

        // Assert
        expect(cellState).toBeFalsy();
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
})