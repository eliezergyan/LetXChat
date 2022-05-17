const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000 

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/messages', require('./routes/messageRoutes.js'));


app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the landing page"});
})



app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})