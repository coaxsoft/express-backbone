const { EventEmitter } = require('events');
const { mailjet } = require('./mailProvider');

const event = new EventEmitter();

event.on('send', async (user, host, slug) => {
  try {
    const resetCode = user.PasswordReset.code;

    await mailjet
      .post('send', { 'version': 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.SYSTEM_EMAIL,
              Name: 'change to name'
            },
            To: [
              {
                Email: user.email,
                Name: user.fullName
              }
            ],
            Subject: 'Reset Password.',
            HTMLPart: `<div>Follow the link to reset your password <a href="http://${host}/${slug}/${resetCode}">link</a>
http://${host}/${slug}/${resetCode}</div>`,
          }
        ]
      })
  } catch (e) {
    console.error(e.message);
  }
});

function sendResetPasswordEmail (user, host, slug) {
  event.emit('send', user, host, slug.replace(/^\/+|\/+$/g, ''))
}


module.exports = {
  sendResetPasswordEmail
};
