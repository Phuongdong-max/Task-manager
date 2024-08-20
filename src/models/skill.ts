import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class Skill extends Model {
  public id!: number;
  public userId!: number;
  public skillName!: string;
}

Skill.init(
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
    skillName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Skill",
  }
);

export default Skill;
