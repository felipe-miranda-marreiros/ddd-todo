const { DataTypes } = require("sequelize");
import { sequelize } from "../config/db";

export const BaseUser = sequelize.define(
  "base_user",
  {
    base_user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
    },
    user_email: {
      type: DataTypes.STRING,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);
