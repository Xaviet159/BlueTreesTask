import React from 'react';
import TaskItem from './taskItem';

const TaskList = ({ tasks, onToggleTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} />
      ))}
    </ul>
  );
};

export default TaskList;