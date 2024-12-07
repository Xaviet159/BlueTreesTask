const express = require('express');
const TaskController = require('../../controllers/taskController');
const router = express.Router();

router.post('/create', TaskController.create);
router.delete('/:id', TaskController.delete);
router.get('/allTasks', TaskController.getAll);
router.get('/:id', TaskController.getById);

module.exports = router;