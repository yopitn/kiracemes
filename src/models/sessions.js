const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");
const users = require("./users");

const sessions = sequelize.define(
  "sessions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: { type: DataTypes.STRING(8), allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updated_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    timestamps: false,
  }
);

users.hasOne(sessions, { foreignKey: "user_id" });
sessions.belongsTo(users, { foreignKey: "user_id" });

module.exports = sessions;
