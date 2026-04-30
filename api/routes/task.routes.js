module.exports = (app) => {
	const task = require('../controllers/task.controller');
	let router = require('express').Router();

  // Get tasks
	router.get('/', async (req, res) => {
    try {
      await task.get(req, res);
    }
    catch (err) {
      console.error(err);
      res.send(err);
    }
  });

  // Create a task
	router.post('/', task.validate('post'), async (req, res) => {
    try {
      await task.create(req, res);
    }
    catch (err) {
      console.error(err);
      res.send(err);
    }
  });

  // Update a task
	router.patch('/:taskId', task.validate('patch'), async (req, res) => {
    try {
      await task.update(req, res);
    }
    catch (err) {
      console.error(err);
      res.send(err);
    }
  });

  // Delete a task
	router.delete('/:taskId', task.validate('delete'), async (req, res) => {
    try {
      await task.delete(req, res);
    }
    catch (err) {
      console.error(err);
      res.send(err);
    }
  });

  app.use('/api/tasks', router);
};
