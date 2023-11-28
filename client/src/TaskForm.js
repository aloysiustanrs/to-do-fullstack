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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
      <label className="block mb-2 text-lg font-semibold">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 px-3 py-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
