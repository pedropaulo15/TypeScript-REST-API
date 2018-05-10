import { expect } from "chai";
//import LinkRepository from "../../src/backend/repositories/link_repository";

// test suite
describe("Adding Numbers", () => {

    // test case 1: read all
    it("2 + 5", () => {
        //const movieRepository = new MovieRepository();
        const result = 2 + 5;
        const expected = 7;
        expect(result).to.eqls(expected);
    });

});

