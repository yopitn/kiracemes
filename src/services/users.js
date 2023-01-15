const bcrypt = require("bcrypt");
const model = require("../models");

exports.create = async (body) => {
  try {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(body.password, salt);

    await model.users.create({
      username: body.username,
      name: body.name,
      email: body.email,
      password: password,
      slug: body.name,
      role: body.role,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (body) => {
  try {
    await model.users.update({
      username: body.username,
      name: body.name,
      email: body.email,
      password: body.password,
      slug: body.slug,
      image: body.image,
      bio: body.bio,
      location: body.location,
      role: body.role,
      meta_title: body.meta_title,
      meta_description: body.meta_description,
      update_at: new Date(),
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.destroy = async (id) => {
  try {
    await model.users.destroy({
      where: {
        id: id,
        role: "author",
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
