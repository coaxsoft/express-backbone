const mailer = require("../../services/mailer");

module.exports = async (user) => {
    try {
        await mailer.sendVerificationEmail(user);
    } catch (e) {
        console.log(e)
    }
};
