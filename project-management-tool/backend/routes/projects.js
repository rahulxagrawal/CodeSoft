const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try { const decoded = jwt.verify(token, process.env.JWT_SECRET); req.userId = decoded.id; next(); }
  catch (err) { res.status(401).json({ message: 'Invalid token' }); }
};

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, members } = req.body;
    const project = await Project.create({ title, description, owner: req.userId, members });
    res.json(project);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ $or: [{ owner: req.userId }, { members: req.userId }] }).populate('owner members', 'name email');
    res.json(projects);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner members', 'name email');
    res.json(project);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
