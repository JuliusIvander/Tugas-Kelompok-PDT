const verifyRegister = require("../middlewares/verifyRegister.js");
const controller = require("../controllers/authControllers.js");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/register", verifyRegister, controller.register);
  app.post("/api/auth/login", controller.login);
};
