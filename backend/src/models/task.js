class Task {
    constructor(id, title, isCompleted = false, createdAt = new Date(), endDate){
        this.id = id;
        this.title =title;
        this.isCompleted = isCompleted;
        this.createdAt = createdAt;
        this.endDate = endDate;
      }
    }
    
    module.exports = Task;
