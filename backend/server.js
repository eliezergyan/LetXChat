const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 5000 

app.get('/', (req, res) => {
    res.json({"message": "Welcome to the landing page"});
})













app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})