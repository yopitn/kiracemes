const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const sequelizeSlugify = require("sequelize-slugify");
const users = require("./users");

const posts = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.STRING(24),
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    author_id: { type: DataTypes.STRING(24), allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    featured: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "post",
      validate: { isIn: [["post", "page"]] },
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "draft",
      validate: { isIn: [["published", "draft", "scheduled"]] },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    published_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    timestamps: false,
  }
);

users.hasOne(posts, { as: "author", foreignKey: "author_id" });
posts.belongsTo(users, { as: "author", foreignKey: "author_id" });

sequelizeSlugify.slugifyModel(posts, {
  source: ["slug"],
});

module.exports = posts;
