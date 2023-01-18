const { DataTypes } = require("sequelize");
const database = require("../database");
const posts = require("./posts");
const tags = require("./tags");

const postsTags = database.define(
  "posts-tags",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: { model: posts, key: "id" },
    },
    tag_id: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: { model: tags, key: "id" },
    },
  },
  {
    timestamps: false,
  }
);

posts.belongsToMany(tags, { foreignKey: "post_id", through: postsTags });
tags.belongsToMany(posts, { foreignKey: "tag_id", through: postsTags });

module.exports = postsTags;
