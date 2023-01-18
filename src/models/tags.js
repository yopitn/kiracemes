const { DataTypes } = require("sequelize");
const database = require("../database");
const { customAlphabet } = require("nanoid");
const SequelizeSlugify = require("sequelize-slugify");

const nanoid = customAlphabet("1234567890", 24);

const tags = database.define(
  "tags",
  {
    id: {
      type: DataTypes.STRING(24),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => {
        return nanoid();
      },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    meta_title: { type: DataTypes.STRING(2000), allowNull: true },
    meta_description: { type: DataTypes.STRING(2000), allowNull: true },
    og_image: { type: DataTypes.STRING(2000), allowNull: true },
    og_title: { type: DataTypes.STRING(200), allowNull: true },
    og_description: { type: DataTypes.STRING(500), allowNull: true },
    twitter_image: { type: DataTypes.STRING(2000), allowNull: true },
    twitter_title: { type: DataTypes.STRING(200), allowNull: true },
    twitter_description: { type: DataTypes.STRING(500), allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    timestamps: false,
  }
);

SequelizeSlugify.slugifyModel(tags, {
  source: ["slug"],
});

module.exports = tags;
