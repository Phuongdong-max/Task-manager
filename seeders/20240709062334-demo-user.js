"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password", 10);
    return queryInterface.bulkInsert("Users", [
      {
        username: "manager",
        email: "manager@example.com",
        password: hashedPassword,
        role: "manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "employee1",
        email: "employee1@example.com",
        password: hashedPassword,
        role: "employee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "employee2",
        email: "employee2@example.com",
        password: hashedPassword,
        role: "employee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
