// models/Task.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");
const { User } = require("./User");

const Task = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define the foreign key relationship
Task.belongsTo(User, {
  foreignKey: "userId", // Name of the foreign key in the tasks table
});

module.exports = { Task };
