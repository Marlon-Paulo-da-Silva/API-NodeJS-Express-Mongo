const express = require("express");
const authMiddleware = require("../middleware/auth.js.js");

const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
  res.send({ user: req.userId });
});

module.exports = app => app.use("/projects", router);
