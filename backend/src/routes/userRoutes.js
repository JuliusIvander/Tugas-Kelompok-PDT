const authJwt = require("../middlewares/authJwt.js");
const controller = require("../controllers/userControllers.js");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/test/create_blog", authJwt, controller.createBlog);
};
