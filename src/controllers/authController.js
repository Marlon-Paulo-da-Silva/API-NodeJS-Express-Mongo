const express = require("express");
const bcrypt = require("bcryptjs");

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

    return res.send({ user });
  } catch (error) {
    return res.status(400).send({ error: "Falha no registro" });
  }
});

//rota autenticar
router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ Error: "Usuario nao encontrado" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "senha nao encontrada! " });

  user.password = undefined;

  res.send({ user });
});

//todas as rotas definidas aqui serao prefixadas no auth
module.exports = app => app.use("/auth", router);
