import React, { useState, useEffect } from 'react';
import TaskList from './taskList';
import TaskForm from './taskForm';
import { getTasks, createTask } from '../services/http/taskAPIService';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      const newTask = await createTask(title);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };


  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks}/>
    </div>
  );
};

export default TodoApp;