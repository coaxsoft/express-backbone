const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app/app");

chai.use(chaiHttp);

describe("Testing base endpoint - /api/v1/test", () => {
    it("Returns 200", async () => {
        const res = await chai.request(server)
            .get("/api/v1/test");

        res.should.have.status(200);
    });

})
