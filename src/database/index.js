const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-beyum.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("banco de dados conectado");
  }
);

module.exports = mongoose;
