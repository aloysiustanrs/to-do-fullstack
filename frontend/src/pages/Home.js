import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import TaskAPI from "../api/TaskAPI";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await TaskAPI.get("/tasks/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const jwt = localStorage.getItem("token");
  const [, payloadBase64] = jwt.split(".");
  const payload = JSON.parse(atob(payloadBase64));
  const username = payload.username;

  const handleAddTask = async (newTaskTitle) => {
    try {
      const response = await TaskAPI.post("/tasks/create", { newTaskTitle }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }
      });
  
      if (response.status === 200) {
        const responseData = response.data;
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
      const response = await TaskAPI.put(`/tasks/update/${taskId}`, { editedTaskTitle }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }
      });
  
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.title === editedTaskTitle ? { ...task, title: editedTaskTitle } : task))
        );
        setEditingTaskId(null);
      } else {
        console.error("Failed to edit task");
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleMarkingTask = async (taskId, taskCompleted) => {
    const oppositeMarking = !taskCompleted;

    try {
      const response = await TaskAPI.put(`/tasks/marking/${taskId}`, { completed: oppositeMarking }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }
      });
  
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? { ...task, completed: oppositeMarking } : task))
        );
        setEditingTaskId(null);
      } else {
        console.error("Failed to edit task");
      }
    } catch (error) {
      console.error("Error marking task:", error);
    }
  };

  const handleStartEditing = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(taskTitle);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await TaskAPI.delete(`/tasks/delete/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }
      });
  
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center pt-8">
        {username}'s Task List
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
