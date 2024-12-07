const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/api/taskRoutes');
const cors = require('cors')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// info... => autosisation des cors.
// warning... => A mettre au dessus des routes.
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
});