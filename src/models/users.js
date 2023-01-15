const { customRandom } = require("nanoid");
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");

const nanoid = customRandom("1234567890", 8);

const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => {
        nanoid();
      },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING(2000), allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    locaion: { type: DataTypes.TEXT, allowNull: true },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "author",
      validate: { isIn: [["admin", "author"]] },
    },
    meta_title: { type: DataTypes.STRING(2000), allowNull: true },
    meta_description: { type: DataTypes.STRING(2000), allowNull: true },
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

module.exports = users;
