const db = require('./db');

const testConnection = async () => {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  } finally {
    db.end();
  }
};

testConnection();