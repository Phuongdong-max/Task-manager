import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class PersonalInfo extends Model {
  public id!: number;
  public userId!: number;
  public fullName!: string;
  public position!: string;
  public dayOfBirth!: Date;
  public gender!: string;
  public country!: string;
  public phone!: string;
  public email!: string;
  public image!: Buffer;
}

PersonalInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dayOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PersonalInfo",
  }
);

export default PersonalInfo;
