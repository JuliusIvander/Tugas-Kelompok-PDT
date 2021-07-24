const authJwt = require("../middlewares/authJwt.js");
const controller = require("../controllers/blogControllers.js");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/getBlog", controller.getLatestBlog);
  app.get("/api/test/getUserBlog", authJwt, controller.getUserLatestBlog);
  app.get("/api/test/getBlog/:id", controller.getBlogById);
};
