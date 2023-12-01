const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const taskController = require("../controllers/taskController");

router.get("/get", verifyToken, taskController.getUserTasks);
router.post("/create", verifyToken, taskController.createTask);
router.put("/update/:taskId", verifyToken, taskController.updateTask);
router.put("/marking/:taskId", verifyToken, taskController.markTask);
router.delete("/delete/:taskId", verifyToken, taskController.deleteTask);

module.exports = router;
