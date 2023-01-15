const express = require("express");
const database = require("./database");

const model = require("./models/users");

const app = express();

const server = async () => {
  const PORT = process.env.PORT || 5215;

  try {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });

    await database.authenticate();
    await model.sync();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = server;
