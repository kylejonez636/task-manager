const { body, param, validationResult } = require('express-validator');
const Task = require('../models/task.model');

exports.validate = (method) => {
  const rules = [];

  const taskExists = () => param('taskId').custom(async (value) => {
    const data = await Task.get();
    if (data?.tasks.findIndex(t => t.id === value) === -1) return Promise.reject('Task not found');
    else return Promise.resolve();
  });
  const textRequired = () => body('text', 'text cannot be empty').trim().escape().not().isEmpty();
  const textOptional = () => body('text', 'text cannot be an empty string').optional().trim().escape().not().isEmpty();

  switch (method) {
    case 'post':
      rules.push(textRequired());
      break;
    case 'patch':
      rules.push(taskExists(), textOptional());
      break;
    case 'delete':
      rules.push(taskExists());
      break;
  }

  return rules;
};

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
    const task = new Task(undefined, req.body.text);
    const result = await Task.create(task);

    const status = result?.status ?? 500;
    res.status(status);
    status === 204 ? res.end() : res.send(result);
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
    const task = new Task(req.params.taskId, req.body.text ?? null, req.body.completed ?? null);
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
