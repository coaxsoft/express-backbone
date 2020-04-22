const { EventEmitter } = require('events');
const mailjet = require('./mail-provider');

const event = new EventEmitter();

event.on('send', async (user) => {
  try {
    const resetCode = '0000'; //TODO change to model method
    await mailjet
      .post('send', { 'version': 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'admin@company-domain.com',
              Name: 'administrator'
            },
            To: [
              {
                Email: user.email,
                Name: user.full_name
              }
            ],
            Subject: 'Reset Password.',
            HTMLPart: `<div>Follow the link to reset your password <a href=${process.env.SERVER_DOMAIN}/api/v1/auth/reset-password/${resetCode}>link</a></div>`,
            CustomID: 'AppGettingStartedTest'
          }
        ]
      })
  } catch (e) {
    console.error(e.message);
  }
});

function sendResetPasswordEmail (user) {
  event.emit('send', user)
}


module.exports = {
  sendResetPasswordEmail
};
