const db = require("../models");
const Blog = db.blog;
const Category = db.category;

const createBlog = (req, res) => {
  Category.findOne({
    attributes: ["id"],
    where: {
      categoryName: req.body.category_name,
    },
  }).then((result) => {
    let categoryId = result.id;

    Blog.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.user_id,
      categoryId: categoryId,
      blogId: categoryId,
    })
      .then((result) => {
        res.status(200).send({
          message: "Blog Berhasil Dibuat!",
        });
      })
      .catch((err) => {
        res.status(500).send({
          error: err,
        });
      });
  });
};

module.exports = {
  createBlog,
};
