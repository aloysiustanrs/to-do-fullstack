import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      // Prevent submitting an empty task
      return;
    }

    const taskId = new Date().getTime();

    const newTask = {
      id: taskId,
      title,
    };

    onSubmit(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
