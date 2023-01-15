const { Sequelize } = require("sequelize");
const config = require("../config/database");

const env = process.env.NODE_ENV || "development";

const database = new Sequelize(
  config[env].DB_NAME,
  config[env].DB_USER,
  config[env].DB_PASS,
  {
    host: config[env].DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);

module.exports = database;
