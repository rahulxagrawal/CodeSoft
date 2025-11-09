const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try { const decoded = jwt.verify(token, process.env.JWT_SECRET); req.userId = decoded.id; next(); }
  catch (err) { res.status(401).json({ message: 'Invalid token' }); }
};

router.post('/:projectId', auth, async (req, res) => {
  try {
    const { title, description, assignee, priority, dueDate } = req.body;
    const task = await Task.create({ project: req.params.projectId, title, description, assignee, priority, dueDate });
    res.json(task);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignee', 'name email');
    res.json(tasks);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
