const config = require("../configs/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsaliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.blog = require("./blog.js")(sequelize, Sequelize);
db.category = require("./kategori.js")(sequelize, Sequelize);

// One To Many Between user and blog (1-M)
db.user.hasMany(db.blog, { as: "blogs_user" });
db.blog.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

// One To Many Between category and blog (1-M)
db.category.hasMany(db.blog, { as: "blogs_category" });
db.blog.belongsTo(db.category, {
  foreignKey: "blogId",
  as: "categories",
});

module.exports = db;
