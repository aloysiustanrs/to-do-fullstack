import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskAPI from "../api/TaskAPI";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Retrieve token from localStorage
    const jwt = localStorage.getItem("token");

    // If token exists, navigate to home page
    if (jwt) {
      navigate("/home");
    }
  }, [navigate]); // Empty dependency array ensures this effect runs only once after initial render

  const handleLogin = async () => {
    try {
      const response = await TaskAPI.post("/auth/login", {
        // Use TaskAPI.post instead of axios.post
        username,
        password,
      });

      if (response.status === 200) {
        // Check status code directly
        const data = response.data;

        localStorage.setItem("token", data.token);

        // Use navigate only if the component is rendered
        navigate("/home");

        console.log("Login successful");
      } else {
        console.error(
          `Login failed with status ${response.status}: ${response.statusText}`
        );

        if (response.status === 401) {
          console.log("Unauthorized - Invalid credentials");
        } else {
          console.log("Other error occurred");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // If token doesn't exist, render login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <input
            className="border border-gray-300 px-3 py-2 w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            className="border border-gray-300 px-3 py-2 w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
