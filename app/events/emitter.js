const EventEmitter = require("events");
const emitter = new EventEmitter();

const sendVerificationEmail = require("./listeners/sendVerificationEmail");
const sendForgotPasswordEmail = require("./listeners/sendForgotPasswordEmail");

emitter.on("userRegistration", sendVerificationEmail);
emitter.on("forgotPassword", sendForgotPasswordEmail);

module.exports = emitter;
