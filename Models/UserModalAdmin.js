const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    dateCreated:{
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("users", UserSchema)