const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Falha no Registro" });
  }
});

//todas as rotas definidas aqui serao prefixadas no auth
module.exports = app => app.use("/auth", router);
