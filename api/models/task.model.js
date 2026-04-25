const { randomUUID } = require('crypto');
const { readTasks, writeTasks } = require('../utils/storage');

class Task {
  constructor(text, completed) {
    this.text = text;
    this.completed = completed;
  }

  static async get() {
    try {
      return await readTasks();
    }
    catch (err) {
      console.error('Error accessing tasks: ', err);
      throw err;
    }
  }

  static async create(text) {
    try {
      const tasks = await readTasks();
      const newTask = {
        id: randomUUID(),
        text,
        completed: false
      }
      if (tasks.findIndex(task => task.id === newTask.id) !== -1) return { error: 'Duplicate task id' };

      tasks.push(newTask);
      await writeTasks(tasks);
      return newTask;
    }
    catch (err) {
      console.error('Error accessing tasks: ', err);
    }
  }
}

module.exports = Task;
