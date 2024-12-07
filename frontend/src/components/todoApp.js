import React, { useEffect } from 'react';
import { getTasks } from '../services/http/taskAPIService'; // Service pour récupérer les tâches

const TestComponent = () => {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        console.log('Données récupérées de la base de données :', data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="test-component">
      <h1>Test de l'API</h1>
      <p>Vérifiez la console pour les données récupérées.</p>
    </div>
  );
};

export default TestComponent;