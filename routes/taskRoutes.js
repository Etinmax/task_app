const { toggleTaskCompletion } = require('../controllers/taskController');





// routes/taskRoutes.js
const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', authenticate, createTask);
router.get('/', authenticate, getTasks);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);
router.patch('/:id/toggle', authenticate, toggleTaskCompletion);

module.exports = router;
