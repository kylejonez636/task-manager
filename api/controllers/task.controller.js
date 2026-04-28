const { validationResult } = require('express-validator');
const Task = require('../models/task.model');

exports.get = async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }

  try {
    const result = await Task.get();
    res.status(result?.status ?? 500).send(result);
  }
  catch (err) {
    throw err;
  }
};

exports.create = async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }

  try {
    const text = req.body.text;
    if (!text) {
      res.status(400).send({ success: false, status: 400, message: 'Text cannot be empty' });
      return;
    }

    const task = new Task(undefined, text);
    const result = await Task.create(task);
    res.status(result?.status ?? 500).send(result);
  }
  catch (err) {
    throw err;
  }
};

exports.update = async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }

  try {
    const text = req.body.text;
    if (text === '') {
      res.status(400).send({ success: false, status: 400, message: 'Text cannot be empty' });
      return;
    }

    const task = new Task(req.params.taskId, req.body.text, req.body.completed);
    const result = await Task.update(task);
    res.status(result?.status ?? 500).send(result);
  }
  catch (err) {
    throw err;
  }
};

exports.delete = async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }

  try {
    const result = await Task.delete(req.params.taskId);
    res.status(result?.status ?? 500).send(result?.success ? null : result);
  }
  catch (err) {
    throw err;
  }
};
