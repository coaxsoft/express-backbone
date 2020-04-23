const { EventEmitter } = require('events');
const { mailjet } = require('./mail-provider');

const event = new EventEmitter();

event.on('send', async (invitation, host, slug) => {
  try {
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
                Email: invitation.email
              }
            ],
            Subject: 'Invite.',
            HTMLPart: `<div>To accept Invite follow the <a href="http://${host}/${slug}/${invitation.invite_code}">link</a>
http://${host}/${slug}/${invitation.invite_code}</div>`,
          }
        ]
      })
  } catch (e) {
    console.error(e.message);
  }
});

function sendInvitationEmail (invitation, host, slug) {
  event.emit('send', invitation, host, slug.replace(/^\/+|\/+$/g, ''));
}


module.exports = {
  sendInvitationEmail
};
