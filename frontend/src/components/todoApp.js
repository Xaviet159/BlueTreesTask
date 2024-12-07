import React, { useState, useEffect } from 'react';
import TaskList from './taskList';
import TaskForm from './taskForm';
import calculatePriority from '../services/tools/priorityTool';
import { getTasks, createTask, updateTask, deleteTask} from '../services/http/taskAPIService';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    
    // info... => Récupère les tâches au chargement
    useEffect(() => {
      fetchTasks();
    }, []);

      const fetchTasks = async () => {
      const data = await getTasks();
      const tasksWithPriorities = data.map(task => ({
        ...task,
        priority: calculatePriority(task.createdAt, task.endDate),
      }));
    
  
      //info... => Trie les tâches par ordre de priorité
    const sortedTasks = tasksWithPriorities.sort((a, b) => {
        const priorityOrder = { forte: 1, moyenne: 2, basse: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    
      setTasks(sortedTasks);
    };
  
    const handleAddTask = async (title, endDate) => {
      const newTask = await createTask(title, endDate);
      const taskWithPriority = {
        ...newTask,
        priority: calculatePriority(newTask.createdAt, newTask.endDate),
      };
      const sortedTasks = [...tasks, taskWithPriority].sort((a, b) => {
        const priorityOrder = { forte: 1, moyenne: 2, basse: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      setTasks(sortedTasks);
    };
  
    // info... => Appel une methode put et prmet la modification de chaque champ.
    const handleChange = async (id, updates) => {
      try {
        const taskToUpdate = tasks.find(task => task.id === id);
  
        const updatedTask = {
          ...taskToUpdate,
          ...updates,
        };
    
        const result = await updateTask(id, updatedTask);
        console.log(result)
        const taskWithPriority = {
          ...result,
          priority: calculatePriority(result.createdAt, result.endDate),
        };
    
        setTasks(prevTasks =>
          prevTasks.map(task => (task.id === id ? taskWithPriority : task))
        );
        fetchTasks(); // refresh du state
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    };
    
    //info... => Supprime une tâche
    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };
  
    return (
      <div className='todo-app'>
        <h1>Notion... (en mieux)</h1>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onChange={handleChange}
                onDeleteTask={handleDeleteTask}
            />
      </div>
    );
  };
  
  export default TodoApp;