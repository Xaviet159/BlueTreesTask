import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, onChange, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedEndDate, setEditedEndDate] = useState(task.endDate);

  const handleSave = () => {
    onChange(task.id, { title: editedTitle, endDate: editedEndDate });
    setIsEditing(false);
  };

  return (
    <li
    >
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              type="date"
              value={editedEndDate || ''}
              onChange={(e) => setEditedEndDate(e.target.value)}
            />
          </>
        ) : (
          <span
            style={{
              textDecoration: task.isCompleted ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => onChange(task.id, { isCompleted: !task.isCompleted })}
          >
            {task.isCompleted ? <FaCheckCircle /> : <FaRegCircle />} {task.title}
            <span>
              ({task.priority})
            </span>
          </span>
        )}
      </div>

      <div>
        {isEditing ? (
          <button onClick={handleSave}>
            <FaSave />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}>
            <FaEdit />
          </button>
        )}
        <button
          onClick={() => onDeleteTask(task.id)}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;