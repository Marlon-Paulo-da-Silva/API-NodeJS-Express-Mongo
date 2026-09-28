const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/test",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("banco de dados conectado");
  }
);

module.exports = mongoose;
