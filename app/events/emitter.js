const EventEmitter = require("events");
const emitter = new EventEmitter();

const sendVerificationEmail = require("./listeners/sendVerificationEmail");

emitter.on("userRegistration", sendVerificationEmail);

module.exports = emitter;
