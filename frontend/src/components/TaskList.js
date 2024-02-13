import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, markTask, deleteTask, editTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  const handleStartEditing = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(taskTitle);
  };

  const handleEditTask = (taskId) => {
    editTask(taskId, editedTaskTitle);
    setEditingTaskId(null);
  };

  return (
    <ul className="max-w-md mx-auto mt-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white border p-4 mb-4 flex justify-between items-center rounded shadow-md"
        >
          {/* Task title and edit */}
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editedTaskTitle}
                onChange={(e) => setEditedTaskTitle(e.target.value)}
              />
              <button onClick={() => handleEditTask(task.id)}>Save</button>
            </>
          ) : (
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => markTask(task.id, task.completed)}
            >
              {task.title}
            </span>
          )}
          <span onClick={() => handleStartEditing(task.id, task.title)}>
            <FaEdit />
          </span>
          {/* Delete */}
          <span onClick={() => deleteTask(task.id)}>
            <FaTrash />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
