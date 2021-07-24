const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");

// { force: true } (Buat drop and recreate table)
db.sequelize.sync().then(() => {
  console.log("Resync DB!");
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Entering Backend Endpoint",
  });
});

require("./src/routes/authRoutes.js")(app);
require("./src/routes/userRoutes.js")(app);
require("./src/routes/blogRoutes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
