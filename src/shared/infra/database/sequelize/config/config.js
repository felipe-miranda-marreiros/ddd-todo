import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    define: {
      timestamps: true,
      underscored: false
    },
    logging: false
  }
);

export const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to db");
  } catch (error) {
    console.log(error);
  }
};
