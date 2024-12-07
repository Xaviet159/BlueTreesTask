const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/api/taskRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
});