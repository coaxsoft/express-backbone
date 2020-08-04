const jwt = require('../functions/jwt');
const { mailjet } = require('./mailProvider');

class MailerService {

    async sendVerificationEmail (user) {
        const code = jwt.generateJWT(user);
        await mailjet
            .post('send', { 'version': 'v3.1' })
            .request({
                Messages: [
                    {
                        From: { Email: process.env.SYSTEM_EMAIL, Name: 'change to name' },
                        To: [{ Email: user.email, Name: user.fullName }],
                        Subject: 'Verify your email',
                        HTMLPart: `
                            <div>Follow the <a href=${process.env.SERVER_DOMAIN}/api/v1/auth/verify/${code}>link</a> to verify your account </div>
                                <br>
                            <div>${process.env.SERVER_DOMAIN}/api/v1/auth/verify/${code}</div>`,
                    }
                ]
            })
    }

    async sendInviteEmail (invitation, slug) {
        await mailjet
            .post('send', { 'version': 'v3.1' })
            .request({
                Messages: [{
                    From: { Email: process.env.SYSTEM_EMAIL, Name: 'change to name' },
                    To: [{ Email: invitation.email }],
                    Subject: 'Invite.',
                    HTMLPart: `<div>To accept Invite follow the <a href="http://${process.env.CLIENT_DOMAIN}/${slug}/${invitation.inviteCode}">link</a>
                        http://${process.env.CLIENT_DOMAIN}/${slug}/${invitation.inviteCode}</div>`,
                }]
            })
    }

    async sendForgotPasswordEmail (user, slug) {
        const resetCode = user.PasswordReset.code;

        await mailjet
            .post('send', { 'version': 'v3.1' })
            .request({
                Messages: [
                    {
                        From: { Email: process.env.SYSTEM_EMAIL, Name: 'change to name' },
                        To: [{ Email: user.email, Name: user.fullName }],
                        Subject: 'Reset Password.',
                        HTMLPart: `<div>Follow the link to reset your password <a href="http://${process.env.CLIENT_DOMAIN}/${slug}/${resetCode}">link</a>
                            http://${process.env.CLIENT_DOMAIN}/${slug}/${resetCode}</div>`,
                    }
                ]
            })
    }
}

module.exports = new MailerService();
