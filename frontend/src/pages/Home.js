import React from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTaskContext } from "../context/TaskContext";

const Home = () => {
  const { tasks, addTask, editTask, markTask, deleteTask } = useTaskContext();

  const jwt = localStorage.getItem("token");
  const [, payloadBase64] = jwt.split(".");
  const payload = JSON.parse(atob(payloadBase64));
  const username = payload.username;

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
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        markTask={markTask}
        deleteTask={deleteTask}
        editTask={editTask} // Pass editTask function to TaskList
      />
    </div>
  );
};

export default Home;
