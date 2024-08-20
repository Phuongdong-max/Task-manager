import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class Certification extends Model {
  public id!: number;
  public userId!: number;
  public certificationName!: string;
}

Certification.init(
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
    certificationName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Certification",
  }
);

export default Certification;
