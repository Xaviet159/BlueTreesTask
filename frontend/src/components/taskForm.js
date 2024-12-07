import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const convertDate = endDate ? new Date(endDate).toISOString() : null;
    onAddTask(title.trim(), convertDate);
    setTitle('');
    setEndDate('');
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder='A terminer pour le...'
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;