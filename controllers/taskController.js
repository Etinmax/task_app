// controllers/taskController.js
const Task = require('../models/Task');

/*exports.createTask = async (req, res) => {
    const { title, description, category, deadline } = req.body;
    try {
        const newTask = new Task({ user: req.user.id, title, description, category, deadline });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};*/

exports.createTask = async (req, res) => {
    try {
        const { title, description, category, dueDate } = req.body;

        const task = new Task({
            user: req.user.id,
            title,
            description,
            category,
            dueDate,
            isCompleted: false // Default to incomplete
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
/*
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
        await task.remove();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};*/



exports.deleteTask = async (req, res) => {
    try {
        console.log("Task ID:", req.params.id); // Log task ID
        console.log("User ID:", req.user.id); // Log authenticated user ID

        const task = await Task.findById(req.params.id);
        if (!task) {
            console.error("Task not found");
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id) {
            console.error("Unauthorized deletion attempt");
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await task.deleteOne(); // Use deleteOne() instead of remove()
        console.log("Task deleted successfully");
        res.json({ message: 'Task deleted' });

    } catch (err) {
        console.error("Error in deleteTask:", err); // Log error to terminal
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.toggleTaskCompletion = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        task.isCompleted = !task.isCompleted; // Toggle completion status
        await task.save();

        res.json({ message: `Task marked as ${task.isCompleted ? 'complete' : 'incomplete'}`, task });
    } catch (err) {
        console.error('Error updating task status:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
