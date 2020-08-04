const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const { User } = require("../../../app/db/models");
const jwt = require("../../../app/functions/jwt");

const { request } = require("../../requestSender");

describe("Account verification code checking - api/v1/auth/verify/:code - GET", () => {
    it("Returns 401 with fabricated code", async () => {
        const res = await request("get", "/api/v1/auth/verify/bad-code");

        res.should.have.status(401);
    });

    it("Returns 200 with user in response", async () => {
        const user = await User.generate();
        const code = jwt.generateJWT(user);

        const res = await request("get", `/api/v1/auth/verify/${code}`);

        res.should.have.status(200);
        expect(res.body.user.email).to.equal(user.email);
    })
});
