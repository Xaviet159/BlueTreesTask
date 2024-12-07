const db = require('../../config/db');
const Task = require('../../models/task');

const TaskRepository = {
    async getAll() {
        const result = await db.query('SELECT * FROM tasks');
        return result.rows.map(
            row => new Task(row.id, row.title, row.is_completed, row.created_at, row.end_date)
        );
    },

    async getById(id) {
        const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length === 0) {
          return null;
        }
        const row = result.rows[0];
        return new Task(row.id, row.title, row.is_completed, row.created_at, row.end_date);
    },

    async create(title, endDate) {
        const result = await db.query(
          'INSERT INTO tasks (title, end_date) VALUES ($1, $2) RETURNING *',
          [title, endDate]
        );
        const row = result.rows[0];
        return new Task(row.id, row.title, row.is_completed, row.created_at, row.end_date);
    },

    async delete(id) {
        const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0;
    },

    async update(id, updates) {
        console.log('Updating task in DB:', id, updates); // Log des données
        const { title, isCompleted, endDate } = updates;
      
        try {
          const result = await db.query(
            `UPDATE tasks
             SET title = $1,
                 is_completed = $2, 
                 end_date = $3
             WHERE id = $4
             RETURNING *`,
            [title, isCompleted, endDate, id]
          );
          return result.rows[0];
        } catch (error) {
          console.error('Error in TaskRepository.update:', error.message); // Log l'erreur SQL
          throw error;
        }
      }
}
module.exports = TaskRepository;