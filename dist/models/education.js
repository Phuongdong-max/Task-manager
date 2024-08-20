"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const user_1 = __importDefault(require("./user"));
class Education extends sequelize_1.Model {
}
Education.init({
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
    school: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fieldOfStudy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Education",
});
exports.default = Education;
