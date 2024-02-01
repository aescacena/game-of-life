import {Cell} from "../src/Cell";
import {faker} from "@faker-js/faker";

export class CellMother{
    static random(): Cell{
        const value = faker.number.int({min: 0, max: 1})
        if(value == 0){
            return Cell.createDeadCell();
        }
        return Cell.createLiveCell();
    }
}