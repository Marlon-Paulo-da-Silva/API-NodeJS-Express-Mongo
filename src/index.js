const express = require("express");

const bodyParser = require("body-parser");

const app = express();

//indicar que vai usar o bodyparser - a funçao json
app.use(bodyParser.json());
//entender quando passar parametros via url
app.use(bodyParser.urlencoded({ extended: false }));

//recebe sempre o req e res
app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(3000);
