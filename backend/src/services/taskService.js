const TaskRepository = require('../dal/repositories/taskRepository');

const TaskService = {

    async getAllTasks() {
        return await TaskRepository.getAll();
    },

    async getTaskById(id) {
        return await TaskRepository.getById(id);
    },

    async createTask(title, endDate){
        if(!title || title.trim() === ''){
            throw new Error('--> Required task title')
        }
        return await TaskRepository.create(title, endDate);
    },

    async deleteTask(id) {
        return await TaskRepository.delete(id);
      }
};

module.exports = TaskService;
