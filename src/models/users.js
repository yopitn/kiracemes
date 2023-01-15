const { customAlphabet } = require("nanoid");
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database");
const sequelizeSlugify = require("sequelize-slugify");

const nanoid = customAlphabet("1234567890", 8);

const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => {
        return nanoid();
      },
    },
    username: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING(2000), allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    location: { type: DataTypes.TEXT, allowNull: true },
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

sequelizeSlugify.slugifyModel(users, {
  source: ["slug"],
});

module.exports = users;
