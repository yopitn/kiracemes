const { Sequelize } = require("sequelize");
const config = require("../config/database");
const path = require("path");

const env = process.env.NODE_ENV || "development";

/*
 ** uncomment code below to use MySQL database
 ** then go to folder src/config/database.js to change the database username, password, name and other information of database.
 */

// const database = new Sequelize(
//   config[env].DB_NAME,
//   config[env].DB_USER,
//   config[env].DB_PASS,
//   {
//     host: config[env].DB_HOST,
//     dialect: "mysql",
//     logging: false,
//     define: {
//       freezeTableName: true,
//     },
//   }
// );

/*
 ** sqlite database
 ** comment code below if you want to use MySQL
 */

const database = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../data/data.sqlite"),
  logging: false,
  define: {
    freezeTableName: true,
  },
});

module.exports = database;
