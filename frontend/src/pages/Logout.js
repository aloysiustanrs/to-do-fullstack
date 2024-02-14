// Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

const Logout = () => {
  const { setTasks } = useTaskContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTasks([]);

    navigate("/");
  }, [setTasks, navigate]);

  // You can also return some UI elements here if needed
  return (
    <div>
      <h1>Logging Out...</h1>
      {/* You can add a loading spinner or a message here if needed */}
    </div>
  );
};

export default Logout;
