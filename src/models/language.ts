import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class Language extends Model {
  public id!: number;
  public userId!: number;
  public languageName!: string;
}

Language.init(
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
    languageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Language",
  }
);

export default Language;
