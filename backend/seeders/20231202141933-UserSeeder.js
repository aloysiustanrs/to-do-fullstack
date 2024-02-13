"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface) => {
    try {

      await queryInterface.bulkDelete("tasks", null, {});
      await queryInterface.bulkDelete("users", null, {});

      const password = "12345";
      const hashedPassword = await bcrypt.hash(password, 10);
      await queryInterface.bulkInsert("users", [
        {
          username: "aloy",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "kar",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error in seeding up:", error);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      "users",
      {
        username: ["aloy", "kar"],
      },
      {}
    );
  },
};
