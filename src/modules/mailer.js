const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const { host, port, pass, user } = require("../config/mail.json");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: "./src/app/resources/mail/auth/",
    layoutsDir: "./src/app/resources/mail/auth/",
    defaultLayout: "forgot_password.html"
  },
  viewPath: path.resolve("./src/resource/mail/"),
  extName: ".html"
};

transport.use("compile", hbs(handlebarOptions));

// transport.use(
//   "compile",
//   hbs({
//     viewEngine: {
//       extName: ".html",
//       partialsDir: path.resolve("./src/resource/mail/")
//     },
//     viewPath: path.resolve("./src/resource/mail/"),
//     extName: ".html"
//   })
// );

module.exports = transport;
