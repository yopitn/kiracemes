const express = require("express");

const app = express();

app.use("/admin", require("./admin"));
app.use("/content", require("./content"));

app.use((req, res) => {
  if (!res.headersSend) {
    res.status(404).json({
      errors: [
        {
          message: "Resource not found",
        },
      ],
    });
  }
});

module.exports = app;
