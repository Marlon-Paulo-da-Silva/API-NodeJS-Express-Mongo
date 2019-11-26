const express = require("express");

const bodyParser = require("body-parser");

const app = express();

//indicar que vai usar o bodyparser - a funçao json
app.use(bodyParser.json());
//entender quando passar parametros via url
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/projectController")(app);

app.listen(3000);
