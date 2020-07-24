const mailer = require("../../services/mailer");

module.exports = async (user, slug) => {
    try {
        await mailer.sendForgotPasswordEmail(user, slug);
    } catch (e) {
        console.log(e)
    }
};
