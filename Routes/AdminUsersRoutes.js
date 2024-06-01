const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Users = require('../Models/UserModalAdmin')
// ********************** API's **************************************************

//CREATE USER
router.post('/user', async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        const userData = new Users(body);
        const result = await userData.save();
        console.log(result);
        res.json(result);  // Send the saved task as response
    } catch (err) {
        console.log("There is an error while saving the task", err);
        res.status(500).json({ error: "Something went wrong while saving the task in DB", details: err });
    }
})

// READING USERS
router.get('/user', async (req, res) => {  // Fixed the parameters
    try {
        const myUsers = await Users.find();
        console.log('This is Users', myUsers);
        res.json(myUsers);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE USER
router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await Users.findByIdAndDelete(id)
        console.log('DELETED USER', deletedUser)

        if (!deletedUser) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.json(deletedUser)

    } catch (err) {
        console.error('Error while deleting task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//UPDATE TASK
router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true })
        // console.log(updatedTask)
        if (!id) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json(updatedUser)
    } catch (err) {
        console.error('Error while updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// *******************************************************************************
module.exports = router

