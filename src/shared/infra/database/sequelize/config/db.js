const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todos", "root", "81235315", {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  define: {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connectedto our db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sequelize, connectToDb };
