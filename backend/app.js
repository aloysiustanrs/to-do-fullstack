const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { sequelize } = require("./db/database");
const { PORT } = require("./config");

async function main() {
  const backendPort = PORT || 3001;

  try {
    // Sequelize
    // set force to true to overwrite any existing tables - all data will be lost!
    await sequelize.sync({ force: false });

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
