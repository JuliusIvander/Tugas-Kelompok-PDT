const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No Token Provided!",
    });
  }

  jwt.verify(token, config.secret, (err, encoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = encoded.userId;
    next();
  });
};