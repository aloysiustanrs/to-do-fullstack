// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);

        // Use navigate only if the component is rendered
        navigate("/home");
        console.log("Registration successful");
      } else {
        console.error(
          `Registration failed with status ${response.status}: ${response.statusText}`
        );

        if (response.status === 409) {
          console.log("Conflict - Username already exists");
        } else {
          console.log("Other error occurred");
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <label className="block mb-4">
          Username:
          <input
            className="border border-gray-300 px-3 py-2 w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            className="border border-gray-300 px-3 py-2 w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
