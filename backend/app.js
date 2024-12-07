const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/api/taskRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
// info... => autosisation des cors.
// warning... => A mettre au dessus des routes.
app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3000'] }));

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
});