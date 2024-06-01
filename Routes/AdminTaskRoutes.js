const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Tasks = require('../Models/TaskModalAdmin')
// ********************** API's **************************************************


// CREATE TASK
router.post('/task', async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        const taskData = new Tasks(body);
        const result = await taskData.save();
        console.log(result);
        res.json(result);  // Send the saved task as response
    } catch (err) {
        console.log("There is an error while saving the task", err);
        res.status(500).json({ error: "Something went wrong while saving the task in DB", details: err });
    }
})

// READ TASK
router.get('/task', async (req, res) => {  // Fixed the parameters
    try {
        const myTasks = await Tasks.find();
        console.log('This is Tasks', myTasks);
        res.json(myTasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE TASK
router.delete('/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await Tasks.findByIdAndDelete(id)
        console.log('DELETED TASK', deletedTask)

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.json(deletedTask)

    } catch (err) {
        console.error('Error while deleting task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//UPDATE TASK
router.put('/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, { new: true })
        // console.log(updatedTask)
        if (!id) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.json(updatedTask)
    } catch (err) {
        console.error('Error while updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// *******************************************************************************
module.exports = router

