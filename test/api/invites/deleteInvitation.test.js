const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../../../app/app");
const { Invite } = require('../../../app/db/models');

const { createUserAndFetchToken } = require("../../utils")

chai.use(chaiHttp);

describe("Delete invitation", () => {

    let invitation = {};
    let token = {};

    beforeEach(async () => {
        token = await createUserAndFetchToken();
        invitation = await Invite.generate();
    });

    it("Returns 200 and deletes invitation", async () => {
        const res = await chai.request(server)
            .delete(`/api/v1/invites/${invitation.id}`)
            .set('Authorization', `Bearer ${token}`);
        res.should.have.status(200);
        const deletedInvite = await Invite.findOne({ where: { id: invitation.id } });
        expect(deletedInvite).to.be.equal(null)
    })
})
