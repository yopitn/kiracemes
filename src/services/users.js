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

exports.findById = async (id) => {
  try {
    const user = model.users.findOne({
      attributes: [
        "id",
        "username",
        "name",
        "email",
        "password",
        "slug",
        "image",
        "bio",
        "location",
        "meta_title",
        "meta_description",
        "created_at",
        "updated_at",
      ],
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (body, id) => {
  try {
    await model.users.update(
      {
        username: body.username,
        name: body.name,
        email: body.email,
        slug: body.slug,
        image: body.image,
        bio: body.bio,
        location: body.location,
        role: body.role,
        meta_title: body.meta_title,
        meta_description: body.meta_description,
        update_at: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.image = async (image, id) => {
  try {
    await model.users.update(
      {
        image: image,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.password = async (password, id) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  await model.users.update(
    {
      password: hashPassword,
    },
    {
      where: {
        id: id,
      },
    }
  );
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
