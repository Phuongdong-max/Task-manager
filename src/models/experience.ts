import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class WorkExperience extends Model {
  public id!: number;
  public userId!: number;
  public position!: string;
  public companyName!: string;
  public startDate!: Date;
  public endDate!: Date;
  public description!: string;
}

WorkExperience.init(
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
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "WorkExperience",
  }
);

export default WorkExperience;
