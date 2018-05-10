import { expect } from "chai";
import request from "supertest";
import { getApp } from "../../src/app";
import { getHandlers } from "../../src/backend/controllers/link_controller";

// Test Suite - Controller
describe("MovieController", () => {

    // test case 1: read all
    it("HTTP GET /", async () => {

        // Integration Test
        const expected = [
            { id: 1, url: "url/test/iwa/typescript", title: "title" },
            { id: 3, url: "url/test/iwa/typescript", title: "title" }
        ];

        const app = await getApp();

        await request(app).get("/api/v1/links/")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.eqls(expected);
            });

    });

    it("linkRouter.get", () => {

        const expected = [
            { id: 1, url: "url/test/iwa/typescript", title: "title" },
            { id: 3, url: "url/test/iwa/typescript", title: "title" }
        ];
        const fakeReq: any = {};
        const fakeResponse: any = {
            json: (links: any[]) => {
                expect(links).eqls(expected);
                return {
                    send: () => {
                        expect(1).to.eqls(1, "send was invoked!");
                    }
                };
            }
        };

        const fakeRepository: any = {
            readAll: () => expected
        };

        const handlers = getHandlers(fakeRepository);
        handlers.getAllLinksHandler(fakeReq, fakeReq);
    });

});