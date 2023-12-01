const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const { PORT } = require("./config");

const backendPort = PORT || 3001;

const app = express();

app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:3000",
  // other CORS options if needed
};

app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/tasks", verifyToken, taskRoutes);

app.listen(backendPort, () => {
  console.log(`Server is running on http://localhost:${backendPort}`);
});
