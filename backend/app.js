require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { User } = require("./models/User");
const { Task } = require("./models/Task");
const { sequelize } = require("./db/database.js");
const seeders = require("./seeders/20231202141933-UserSeeder.js");

Task.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});
User.hasMany(Task, {
  foreignKey: "userId",
  sourceKey: "id",
});

async function main() {
  const backendPort = process.env.PORT || 3001;

  try {
    // set force to true to overwrite any existing tables - all data will be lost!
    // Sequelize sync for User and Task model
    await User.sync({ force: false });
    await Task.sync({ force: false });

    // Seeders to create data in tables initially
    await seeders.up(sequelize.getQueryInterface());

    // Express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", verifyToken, taskRoutes);

    app.listen(backendPort, () => {
      console.log(`Server is running on http://localhost:${backendPort}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
