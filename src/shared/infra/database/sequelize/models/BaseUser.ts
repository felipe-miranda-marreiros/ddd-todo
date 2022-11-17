import { DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { sequelize } from "../config/config";

export const BaseUser = sequelize.define("users", {
  base_user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  user_email: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
    type: DataTypes.DATE,
  },
});
