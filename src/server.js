const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const database = require("./database");
const flash = require("connect-flash");
const logger = require("./libs/logger");
const path = require("path");
const routes = require("./routes");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(flash());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: process.env.SESSION_SECRET,
    name: "stocks-app-session",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

routes(app);

const server = async () => {
  const PORT = process.env.PORT || 5215;

  try {
    app.listen(PORT, () => {
      logger.info(`Server running at port ${PORT}`);
    });

    await database.authenticate();
    await database.sync();
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = server;
