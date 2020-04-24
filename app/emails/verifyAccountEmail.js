const { EventEmitter } = require('events');
const { mailjet } = require('./mailProvider');
const jwt = require('../functions/jwt');

const event = new EventEmitter();

event.on('send', async (user) => {
  try {
    const code = jwt.generateJWT(user);
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
            Subject: 'Verify your email',
            HTMLPart: `<div>Follow the <a href=${process.env.SERVER_DOMAIN}/api/v1/auth/verify/${code}>link</a> to verify your account </div>
<br>
<div>${process.env.SERVER_DOMAIN}/api/v1/auth/verify/${code}</div>`,
          }
        ]
      })
  } catch (e) {
    console.error(e.message);
  }
});

function sendVerifyEmail (user) {
  event.emit('send', user)
}


module.exports = {
  sendVerifyEmail
};
