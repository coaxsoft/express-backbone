const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const faker = require("faker");
const sinon = require("sinon");
const server = require("../../../app/app");
const { User } = require("../../../app/db/models");
const emitter = require("../../../app/events/emitter");
const mailer = require("../../../app/services/mailer");

chai.use(chaiHttp);

describe("Send email with forgot password link - api/v1/auth/forgot-password - POST", () => {

    let eventSpy = {};
    let sendForgotPasswordEmailSpy = {};

    beforeEach(async () => {
        eventSpy = sinon.spy();
        emitter.on("forgotPassword", eventSpy);
        sendForgotPasswordEmailSpy = sinon.stub(mailer, "sendForgotPasswordEmail").returns(Promise.resolve());
    });

    afterEach(async () => {
        mailer.sendForgotPasswordEmail.restore();
        emitter.off("forgotPassword", eventSpy);
    });

    it("returns 404 if user not found by email", async () => {
        const email = `${faker.random.word()}_${faker.internet.email()}`

        const res = await chai.request(server)
            .post("/api/v1/auth/forgot-password")
            .send({
                slug: "test",
                email
            });
        res.should.have.status(404);
    })

    it("Runs a function to send email with forgot password link", async () => {
        const user = await User.generate();

        await chai.request(server)
            .post("/api/v1/auth/forgot-password")
            .send({
                slug: "test",
                email: user.email
            }).then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        sendForgotPasswordEmailSpy.called.should.be.equal(true);
                        expect(sendForgotPasswordEmailSpy.args[0][0].email).to.be.equal(user.email);
                        resolve();
                    }, 500);
                });
            });
    })
})
