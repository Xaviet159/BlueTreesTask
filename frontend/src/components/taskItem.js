import React from 'react';

const TaskItem = ({ task, onToggleTask }) => {
  return (
    <li className="task-item">
      <label>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleTask(task.id, task.isCompleted)}
        />
        {task.title}
      </label>
    </li>
  );
};

export default TaskItem;