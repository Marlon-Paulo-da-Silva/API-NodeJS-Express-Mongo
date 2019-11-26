const nodemailer = require("nodemailer");

const { host, port, pass, user } = require("../config/mail.json");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
});

module.exports = transport;
