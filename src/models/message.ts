import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class Message extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public message!: string;
  public timestamp!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: false,
  }
);

export default Message;
