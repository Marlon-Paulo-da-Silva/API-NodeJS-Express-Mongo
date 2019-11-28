const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../../modules/mailer.js");

const authConfig = require("../../config/auth.json");

const User = require("../models/User");

const router = express.Router();

//rota  registrar
router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Usuario ja existe" });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (error) {
    return res.status(400).send({ error: "Falha no registro" });
  }
});

//gerar token
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

//rota autenticar
router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ Error: "Usuario nao encontrado" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "senha nao encontrada! " });

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
});

router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ erro: "Usuario nao encontrado" });

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();

    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(
      user.id,
      {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      },
      { new: true, useFindAndModify: false }
    );

    mailer.sendMail(
      {
        to: email,
        from: "marlon.pauloo@gmail.com",
        template: "auth/forgot_password",
        context: { token }
      },
      err => {
        console.log(err);

        if (err)
          return res.status(400).send({
            error: "Nao foi possivel enviar email de esqueci a senha"
          });

        return res.send();
      }
    );
  } catch (error) {
    res.status(400).send({ erro: "Erro no Esquecer senha, tente novamente" });

    console.log(error);
  }
});
//todas as rotas definidas aqui serao prefixadas no auth
module.exports = app => app.use("/auth", router);
