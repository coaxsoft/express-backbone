const jwt = require('../functions/jwt');
const { mailjet } = require('../emails/mailProvider');

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
}

module.exports = new MailerService();
