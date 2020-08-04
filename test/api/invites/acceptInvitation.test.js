const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const { Invite } = require('../../../app/db/models');

const { request } = require("../../requestSender");

describe("Accept invitation invitation", () => {

    let invitation = {};

    beforeEach(async () => {
        invitation = await Invite.generate({ status: Invite.constants.newInvite });
    });

    it("Returns 200 with token in response body", async () => {
        const res = await request("post", `/api/v1/invites/${invitation.inviteCode}/accept`);

        res.should.have.status(200);
        expect(res.body.token).to.not.equal(null)
    })
})
