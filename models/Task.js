// models/Task.js
/*const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    deadline: { type: Date },
    completed: { type: Boolean, default: false }
});
module.exports = mongoose.model('Task', TaskSchema);
*/
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['Work', 'Personal', 'Urgent', 'Others'], default: 'Others' }, // ✅ Categorization
    dueDate: { type: Date }, // ✅ Deadline
    isCompleted: { type: Boolean, default: false }, // ✅ Task status
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
