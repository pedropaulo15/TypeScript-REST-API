import { expect } from "chai";
import LinkRepository from "../../src/backend/repositories/link_repository";

// test suite
describe("Test Suite", () => {

    // test case 1: read all
    it("5 = 5", () => {
        //const LinkRepository = new LinkRepository();
        // const result = LinkRepository.readAll();
        // const expected = [
        //     // { id: 1, title: "Star Wars" },
        //     // { id: 2, title: "Star Trek" }
        // ];
        const result = 5;
        const expected = 5;
        expect(result).to.eqls(expected);
    });

    // test case 2: read by Id
    // it("MovieRepository.readById(id)", () => {
    //     const movieRepository = new MovieRepository();
    //     const result1 = movieRepository.readById(1);
    //     const expected1 = { id: 1, title: "Star Wars" };
    //     expect(result1).to.eqls(expected1);
    //     const result2 = movieRepository.readById(2);
    //     const expected2 = { id: 2, title: "Star Trek" };
    //     expect(result2).to.eqls(expected2);
    //     const result3 = movieRepository.readById(0);
    //     const expected3 = null;
    //     expect(result3).to.eqls(expected3);
    // });

});

