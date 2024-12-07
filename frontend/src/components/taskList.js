import React from 'react';
import TaskItem from './taskItem';

const TaskList = ({ tasks, onChange, onDeleteTask }) => {
  return (
    <ul className='task-list'>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onChange={onChange}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;