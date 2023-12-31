import {suma} from "../src/suma";

describe("sum of two numbers", () => {
    it("Sum 1 + 2 is equal 3", () => {
        expect(3).toEqual(suma(1, 2));
    })
})