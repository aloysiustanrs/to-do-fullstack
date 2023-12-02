// Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const currentUser = localStorage.getItem("user");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch("http://localhost:3001/tasks/get", options);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (newTaskTitle) => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newTaskTitle }),
      };

      const response = await fetch(
        "http://localhost:3001/tasks/create",
        options
      );

      if (response.ok) {
        const responseData = await response.json();
        const taskId = responseData.taskId;

        const newTask = {
          id: taskId,
          title: newTaskTitle,
          completed: false,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (taskId, editedTaskTitle) => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ editedTaskTitle }),
      };

      const response = await fetch(
        `http://localhost:3001/tasks/update/${taskId}`,
        options
      );
      const data = await response.json();

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.title === data.title ? data : task))
        );
        setEditingTaskId(null); // Clear the editing task ID after successful edit
      } else {
        console.error("Failed to edit task:", data);
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }

    await fetchTasks();
  };

  const handleMarkingTask = async (taskId, taskCompleted) => {
    var oppositeMarking = !taskCompleted;

    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: oppositeMarking }),
      };

      const response = await fetch(
        `http://localhost:3001/tasks/marking/${taskId}`,
        options
      );
      const data = await response.json();

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.title === data.title ? data : task))
        );
        setEditingTaskId(null); // Clear the editing task ID after successful edit
      } else {
        console.error("Failed to edit task:", data);
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }

    await fetchTasks();
  };

  const handleStartEditing = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(taskTitle);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `http://localhost:3001/tasks/delete/${taskId}`,
        options
      );

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        const data = await response.json();
        console.error("Failed to delete task:", data);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center pt-8">
        {currentUser}'s Task List
      </h1>
      <Link
        to="/logout"
        className="text-blue-500 hover:underline block text-center mb-4"
      >
        Logout
      </Link>
      <TaskForm onSubmit={handleAddTask} />
      <ul className="max-w-md mx-auto mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white border p-4 mb-4 flex justify-between items-center rounded shadow-md"
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
                <button
                  onClick={() => handleEditTask(task.id, editedTaskTitle)}
                >
                  Save
                </button>
              </>
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                onClick={() => handleMarkingTask(task.id, task.completed)}
              >
                {task.title}
              </span>
            )}
            {editingTaskId ? (
              <></>
            ) : (
              <span onClick={() => handleStartEditing(task.id, task.title)}>
                <FaEdit />
              </span>
            )}
            <span onClick={() => handleDeleteTask(task.id)}>
              <FaTrash />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
