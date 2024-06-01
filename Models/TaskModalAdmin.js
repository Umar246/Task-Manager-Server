const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskStartDate: {
        type: String,
        required: true
    },
    taskEndDate: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    assignedTo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    }

})


module.exports = mongoose.model('tasks', TaskSchema);
