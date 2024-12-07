import React, { useState, useEffect } from 'react';
import TaskList from './taskList';
import TaskForm from './taskForm';
import { getTasks, createTask, updateTask} from '../services/http/taskAPIService';

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

    // info... => Fonction qui calcul le nombre de jour restant entre deux dates données.
    const calculatePriority = (startDate, endDate) => {
        if (!endDate) return 'basse'; // info... => Pas de date de fin = priorité basse

        const start = new Date(startDate);
        const end = new Date(endDate);
        const difference = end - start;

        // info... => Définition des priorité
        if (difference <= 0) return 'forte'; 
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
        if (daysLeft <= 3) return 'forte';
        if (daysLeft <= 7) return 'moyenne'; 
        return 'basse'; 
    };
  
    return (
      <div className='todo-app'>
        <h1>Notion... (en mieux)</h1>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onChange={handleChange}
            />
      </div>
    );
  };
  
  export default TodoApp;