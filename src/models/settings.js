const { DataTypes } = require("sequelize");
const database = require("../database");

const settings = database.define(
  "settings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING(), allowNull: true },
    value: { type: DataTypes.STRING(), allowNull: true },
  },
  {
    timestamps: false,
  }
);

module.exports = settings;
