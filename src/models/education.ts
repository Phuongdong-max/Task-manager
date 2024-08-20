import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class Education extends Model {
  public id!: number;
  public userId!: number;
  public school!: string;
  public fieldOfStudy!: string;
  public endDate!: Date;
}

Education.init(
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
    school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fieldOfStudy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Education",
  }
);

export default Education;
