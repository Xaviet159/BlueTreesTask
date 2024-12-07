const pool = require('../../config/db');

// info... => Création d'une table en utilisant la commande : 
const recreateTasksTable = async () => {
  const dropQuery = `
    DROP TABLE IF EXISTS tasks;
  `;

  const createQuery = `
    CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      is_completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      end_date TIMESTAMP
    );
  `;

  try {
    //info.. => Supprimer l'ancienne table si elle existe
    await pool.query(dropQuery);
    console.log('Table "tasks" dropped successfully');
    
    //info... => Créer la nouvelle table
    await pool.query(createQuery);
    console.log('Table "tasks" created successfully');

  } catch (error) {
    console.error('Error recreating table "tasks":', error.message);
  }
};

recreateTasksTable();