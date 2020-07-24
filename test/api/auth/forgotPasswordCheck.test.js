const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../../../app/app");
const { User, PasswordReset } = require("../../../app/db/models");

chai.use(chaiHttp);

describe("Forgot password check - api/v1/auth/check-forgot-password - POST", () => {
    it("Returns 404 if user is not found by the code", async () => {
        const res = await chai.request(server)
            .post("/api/v1/auth/check-forgot-password")
            .send({
                code: "fake",
                password: "not-fake"
            });

        res.should.have.status(404);
    });

    it("Returns 200", async () => {
        const user = await User.generate();
        const passReset = await PasswordReset.generate({ userId: user.id });

        const res = await chai.request(server)
            .post("/api/v1/auth/check-forgot-password")
            .send({
                code: passReset.code,
                password: "not-fake"
            });

        res.should.have.status(200);
    })
});
