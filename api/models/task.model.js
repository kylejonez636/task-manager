const { randomUUID } = require('crypto');
const { readTasks, writeTasks } = require('../utils/storage');

class Task {
  constructor(id = randomUUID(), text = '', completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  static async get() {
    try {
      return { success: true, status: 200, tasks: await readTasks() };
    }
    catch (err) {
      console.error('Error accessing tasks: ', err);
      throw err;
    }
  }

  static async create(task) {
    try {
      const tasks = await readTasks();
      if (tasks.length === 10) return { success: false, status: 507, message: 'Maximum number of tasks reached' };
      if (tasks.findIndex(t => t.id === task.id) !== -1) return { success: false, status: 409, message: 'Duplicate task id' };

      tasks.push(task);
      await writeTasks(tasks);
      return { success: true, status: 201, task };
    }
    catch (err) {
      console.error('Error accessing tasks: ', err);
    }
  }

  static async update(task) {
    try {
      const tasks = await readTasks();
      const index = tasks.findIndex(t => t.id === task.id);
      if (index === -1) return { success: false, status: 404, message: 'Task not found' };

      tasks[index] = { ...tasks[index], ...task };
      await writeTasks(tasks);
      return { success: true, status: 204, task };
    }
    catch (err) {
      console.error('Error accessing tasks: ', err);
    }
  }

  static async delete(taskId) {
    try {
      const tasks = await readTasks();
      const index = tasks.findIndex(t => t.id === taskId);
      if (index === -1) return { success: false, status: 404, message: 'Task not found' };

      tasks.splice(index, 1);
      await writeTasks(tasks);
      return { success: true, status: 204 };
    }
    catch (err) {
      console.error('Error accessing tasks: ', err);
    }
  }
}

module.exports = Task;
