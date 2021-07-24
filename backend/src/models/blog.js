module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blogs", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return Blog;
};
