// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const currentUser = localStorage.getItem('user')

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch('http://localhost:3001/tasks/get', options);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      };

      const response = await fetch('http://localhost:3001/tasks/create', options);

      if (response.ok) {
        setTasks(prevTasks => [...prevTasks, newTask]);
      } else {
        console.error('Failed to add task:', newTask);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (taskId, editedTask) => {
   
    try {
      const token = localStorage.getItem('token');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ editedTask }),
      };

      const response = await fetch(`http://localhost:3001/tasks/update/${taskId}`, options);
      const data = await response.json();

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.title === data.title ? data : task))
        );
        setEditingTaskId(null); // Clear the editing task ID after successful edit
      } else {
        console.error('Failed to edit task:', data);
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }

    await fetchTasks();

  };

  const handleStartEditing = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(taskTitle)
  };

  const handleCancelEditing = () => {
    setEditingTaskId(null);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`http://localhost:3001/tasks/delete/${taskId}`, options);

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        const data = await response.json();
        console.error('Failed to delete task:', data);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>{currentUser}'s Task List</h1>
      <Link to="/logout">Logout</Link>
      <TaskForm onSubmit={handleAddTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editedTaskTitle}
                onChange={(e) => setEditedTaskTitle(e.target.value)}
              />
              <button onClick={() => handleEditTask(task.id, editedTaskTitle)}>Save</button>
              <button onClick={handleCancelEditing}>Cancel</button>
            </>
          ) : (
            <span>{task.title}</span>
          )}
          {editingTaskId?<></>:<button onClick={() => handleStartEditing(task.id, task.title)}>Edit</button>}          
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
