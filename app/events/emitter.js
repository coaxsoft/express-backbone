const EventEmitter = require('events');
const emitter = new EventEmitter();

const sendVerificationEmail = require('./listeners/sendVerificationEmail');
const sendForgotPasswordEmail = require('./listeners/sendForgotPasswordEmail');
const sendInviteEmail = require('./listeners/sendInviteEmail');

emitter.on('userRegistration', sendVerificationEmail);
emitter.on('forgotPassword', sendForgotPasswordEmail);
emitter.on('userInvitation', sendInviteEmail);

module.exports = emitter;
