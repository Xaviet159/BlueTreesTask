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

  const insertDataQuery = `
  INSERT INTO tasks (title, is_completed)
  VALUES
    ('Réaliser l''impossible en 4h', TRUE),
    ('Trouver le café parfait', TRUE),
    ('Apprendre à jongler avec des idées brillantes', FALSE),
    ('Créer une application sans bugs (utopie ?)', FALSE),
    ('Conquérir le monde (mais après le déjeuner)', FALSE),
    ('Tester les limites de ma créativité', TRUE);
`;

  try {
    //info.. => Supprimer l'ancienne table si elle existe
    await pool.query(dropQuery);
    console.log('Table "tasks" dropped successfully');
    
    //info... => Créer la nouvelle table
    await pool.query(createQuery);
    console.log('Table "tasks" created successfully');

    //info... => Insertion de donnée de base
    await pool.query(insertDataQuery);
    console.log('Data inserted successfully');

  } catch (error) {
    console.error('Error recreating table "tasks":', error.message);
  }
};

recreateTasksTable();