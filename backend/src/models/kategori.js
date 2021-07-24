module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Category;
};
