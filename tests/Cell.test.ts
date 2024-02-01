import {Cell} from "../src/Cell";
import {faker} from "@faker-js/faker";

describe("", () => {
    it("Should dead because it has less than 2 neighbors", () => {
        // Arrange
        const cell      = Cell.createLiveCell();
        const neighbors = faker.number.int({min: 0, max:1});

        // Act
        const evolvedCell = cell.evolves(neighbors);

        // Assert
        expect(evolvedCell.isDead()).toBeTruthy();
    });

   it("Should dead because it has more than 3 neighbors", () => {
       // Arrange
       const cell      = Cell.createLiveCell();
       const neighbors = faker.number.int({min: 3});

       // Act
       const evolvedCell = cell.evolves(neighbors);

       // Assert
       expect(evolvedCell.isDead()).toBeTruthy();
   });

    it("Should still alive because it has 2 or 3 neighbors", () => {
        // Arrange
        const cell      = Cell.createLiveCell();
        const neighbors = faker.number.int({min: 2, max: 3});

        // Act
        const evolvedCell = cell.evolves(neighbors);

        // Assert
        expect(evolvedCell.isAlive()).toBeTruthy();
    });

    it("Should revive because it has 3 neighbors", () => {
        // Arrange
        const cell      = Cell.createDeadCell();
        const neighbors = 3;

        // Act
        const evolvedCell = cell.evolves(neighbors);

        // Assert
        expect(evolvedCell.isAlive()).toBeTruthy();
    });
});