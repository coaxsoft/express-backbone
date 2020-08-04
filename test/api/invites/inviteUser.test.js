const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const faker = require("faker");
const sinon = require("sinon");
const server = require("../../../app/app");
const emitter = require("../../../app/events/emitter");
const mailer = require("../../../app/services/mailer");

const { createUserAndFetchToken } = require("../../utils")

chai.use(chaiHttp);

describe("User invitation", () => {

    let eventSpy = {};
    let sendInviteEmailSpy = {};
    let token = "";

    beforeEach(async () => {
        token = await createUserAndFetchToken();
        eventSpy = sinon.spy();
        emitter.on("userInvitation", eventSpy);
        sendInviteEmailSpy = sinon.stub(mailer, "sendInviteEmail").returns(Promise.resolve());
    });

    afterEach(async () => {
        mailer.sendInviteEmail.restore();
        emitter.off("userInvitation", eventSpy);
    });

    it("Rins function to sends invitation email", async () => {
        const email = faker.internet.email();
        await chai.request(server)
            .post("/api/v1/invites/")
            .set('Authorization', `Bearer ${token}`)
            .send({
                slug: "test",
                email
            }).then((res) => {
                res.should.have.status(200);
                return new Promise(resolve => {
                    setTimeout(() => {
                        sendInviteEmailSpy.called.should.be.equal(true);
                        resolve();
                    }, 500);
                });
            });
    });
});
