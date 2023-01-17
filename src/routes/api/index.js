const express = require("express");

const app = express();

app.use("/admin", require("./admin"));

module.exports = app;
