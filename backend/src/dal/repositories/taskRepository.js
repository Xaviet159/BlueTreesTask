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
      }

    // TODO Terminer CRUD !
}
module.exports = TaskRepository;