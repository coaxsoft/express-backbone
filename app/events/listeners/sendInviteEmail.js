const mailer = require("../../services/mailer");

module.exports = async (invitation, slug) => {
    try {
        await mailer.sendInviteEmail(invitation, slug);
    } catch (e) {
        console.log(e)
    }
};
