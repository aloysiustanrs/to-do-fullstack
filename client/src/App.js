import React, { useState, useEffect } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};


  const handleGetTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks', {
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error('Failed to fetch tasks');
    }
  };

  const handleAddTask = async () => {
    const response = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ title: newTask }),
    });

    if (response.ok) {
      setNewTask('');
      handleGetTasks();
    } else {
      console.error('Failed to add task');
    }
  };

  const handleUpdateTask = async (taskId, completed) => {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ completed }),
    });

    if (response.ok) {
      handleGetTasks();
    } else {
      console.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      handleGetTasks();
    } else {
      console.error('Failed to delete task');
    }
  };

  const handleLogout = () => {
    setToken('');
    setTasks([]);
  };

  useEffect(() => {
    if (token) {
      handleGetTasks();
    }
  }, [token]);

  return (
    <div>
      {token ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <h2>Your Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => handleUpdateTask(task.id, e.target.checked)}
                />
                {task.title}{' '}
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div>
            <h2>Add a New Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
