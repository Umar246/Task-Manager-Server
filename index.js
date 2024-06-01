// Import Libraries
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

//________________________________________________________________________________________________________________________________
//Using Libraries
const app = express()
app.use(express.json())
app.use(cors())
    
//________________________________________________________________________________________________________________________________
//Routes

// 1
const taskRoutes = require('./Routes/AdminTaskRoutes')
app.use('/admin', taskRoutes)

// 2
const userRoutes = require('./Routes/AdminUsersRoutes')
app.use('/admin', userRoutes)

//________________________________________________________________________________________________________________________________
//MongoDB Connection (Connect with DB)
const mongoDB_URL = 'mongodb+srv://Umar-Hayaat:task123@cluster0.qhwwid9.mongodb.net/Task-Manager-Web-App?retryWrites=true&w=majority&appName=Cluster0';

(async () => {
    try {
        await mongoose.connect(mongoDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connected Successfully!');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1); // Exit the process if unable to connect to the database
    }
})();

//________________________________________________________________________________________________________________________________
// Server Runing PORT
const PORT = 8005;
app.listen(PORT, () => { console.log('Server is runing at this PORT', PORT) })