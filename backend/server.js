const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000 

connectDB()

app.get('/', (req, res) => {
    res.json({"message": "Welcome to the landing page"});
})














app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})