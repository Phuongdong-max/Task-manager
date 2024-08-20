"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const user_1 = __importDefault(require("./user"));
class PersonalInfo extends sequelize_1.Model {
}
PersonalInfo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dayOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "PersonalInfo",
});
exports.default = PersonalInfo;
