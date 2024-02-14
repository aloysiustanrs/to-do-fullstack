import React, { createContext, useContext, useState, useEffect } from "react";
import TaskAPI from "../api/TaskAPI";
import { useLocation } from "react-router-dom";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if current location pathname is the home page
    setIsHomePage(location.pathname === "/home");
  }, [location]);

  useEffect(() => {
    if (isHomePage) {
      fetchTasks();
    }
  }, [isHomePage]);

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

  const addTask = async (newTaskTitle) => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await TaskAPI.post(
        "/tasks/create",
        { newTaskTitle },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
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

  const editTask = async (taskId, editedTaskTitle) => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await TaskAPI.put(
        `/tasks/update/${taskId}`,
        { editedTaskTitle },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, title: editedTaskTitle } : task
          )
        );
      } else {
        console.error("Failed to edit task");
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const markTask = async (taskId, taskCompleted) => {
    const oppositeMarking = !taskCompleted;

    try {
      const jwt = localStorage.getItem("token");
      const response = await TaskAPI.put(
        `/tasks/marking/${taskId}`,
        { completed: oppositeMarking },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: oppositeMarking } : task
          )
        );
      } else {
        console.error("Failed to mark task");
      }
    } catch (error) {
      console.error("Error marking task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await TaskAPI.delete(`/tasks/delete/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
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
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, markTask, deleteTask, setIsHomePage }}
    >
      {children}
    </TaskContext.Provider>
  );
};
