const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const faker = require("faker");
const sinon = require("sinon");
const server = require("../../../app/app");
const emitter = require("../../../app/events/emitter");
const mailer = require("../../../app/services/mailer");

chai.use(chaiHttp);

describe("Registration tests - api/v1/auth/register - POST", () => {

    let eventSpy = {};
    let sendVerificationEmailSpy = {};

    beforeEach(async () => {
        eventSpy = sinon.spy();
        emitter.on("userRegistration", eventSpy);
        sendVerificationEmailSpy = sinon.stub(mailer, "sendVerificationEmail").returns(Promise.resolve());
    });

    afterEach(async () => {
        mailer.sendVerificationEmail.restore();
        emitter.off("userRegistration", eventSpy);
    });

    it("Returns 422 without password", async () => {
        const res = await chai.request(server)
            .post("/api/v1/auth/register")
            .send({
                firstName: "name",
                lastName: "last",
                email: "test@test.com"
            });

        res.should.have.status(422);
    });

    it("Returns 200 with user in the body", async () => {
        const email = `${faker.random.word()}_${faker.internet.email()}`

        const res = await chai.request(server)
            .post("/api/v1/auth/register")
            .send({
                firstName: "name",
                lastName: "last",
                password: "123123",
                email
            });

        res.should.have.status(200);
        expect(res.body.user.email).to.be.equal(email.toLowerCase());
    });

    it("Returns 200 and run function to send email with verification", async () => {
        const email = `${faker.random.word()}_${faker.internet.email()}`

        await chai.request(server)
            .post("/api/v1/auth/register")
            .send({
                firstName: "name",
                lastName: "last",
                password: "123123",
                email
            }).then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        sendVerificationEmailSpy.called.should.be.equal(true);
                        expect(sendVerificationEmailSpy.args[0][0].email).to.be.equal(email.toLowerCase());
                        resolve();
                    }, 500);
                });
            });
    })
})
