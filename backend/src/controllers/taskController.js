const TaskService = require('../services/taskService');

const TaskController = {
  async getAll(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      console.log(tasks);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { title, endDate } = req.body;
      console.log('Title:', title);
      console.log('EndDate:', endDate); 
      const task = await TaskService.createTask(title, endDate);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const success = await TaskService.deleteTask(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = TaskController;