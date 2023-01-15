const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const database = require("./database");
const path = require("path");
const routes = require("./routes");

const model = require("./models/users");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

routes(app);

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
