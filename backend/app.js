const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { sequelize } = require("./db/database");
const { PORT } = require("./config");
const { User } = require("./models/User");
const { Task } = require("./models/Task");

Task.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});
User.hasMany(Task, {
  foreignKey: "userId",
  sourceKey: "id",
});

async function main() {
  const backendPort = PORT || 3001;

  try {
    // Sequelize
    // set force to true to overwrite any existing tables - all data will be lost!
    // Sequelize sync for User model
    await User.sync({ force: false });
    await Task.sync({ force: false });

    // Express app
    const app = express();
    app.use(bodyParser.json());
    const corsOptions = {
      origin: "http://localhost:3000",
    };
    app.use(cors(corsOptions));
    app.use("/auth", authRoutes);
    app.use("/tasks", verifyToken, taskRoutes);

    app.listen(backendPort, () => {
      console.log(`Server is running on http://localhost:${backendPort}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
