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
    res.send(result);
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
    const result = await Task.create(req.body.text);
    if (result?.error) res.status(409).send(result);
    else res.status(201).send(result);
  }
  catch (err) {
    throw err;
  }
};
