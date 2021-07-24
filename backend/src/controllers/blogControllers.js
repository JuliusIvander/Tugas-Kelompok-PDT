const db = require("../models");
const Blog = db.blog;
const User = db.user;
const Category = db.category;

const getLatestBlog = (req, res) => {
  Blog.findAll({
    attributes: ["id", "title"],
    limit: 6,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        as: "users",
        attributes: ["name"],
      },
      {
        model: Category,
        as: "categories",
        attributes: ["categoryName"],
      },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

const getUserLatestBlog = (req, res) => {
  Blog.findAll({
    attributes: ["id", "title"],
    limit: 6,
    order: [["createdAt", "DESC"]],
    where: {
      userId: req.query.userId,
    },
    include: [
      {
        model: User,
        as: "users",
        attributes: ["name"],
      },
      {
        model: Category,
        as: "categories",
        attributes: ["categoryName"],
      },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

const getBlogById = (req, res) => {
  Blog.findOne({
    attributes: ["id", "title", "content", "createdAt"],
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        as: "users",
        attributes: ["name"],
      },
      {
        model: Category,
        as: "categories",
        attributes: ["categoryName"],
      },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

module.exports = {
  getLatestBlog,
  getUserLatestBlog,
  getBlogById,
};
