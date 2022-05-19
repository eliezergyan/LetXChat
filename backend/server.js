const express = require('express')
const app = express()
const colors = require('colors')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')


const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000 

// These chatroooms are hardcoded
// Make it dynamic
const rooms = ['general', 'tech', 'finance', 'crypto']

// Connect to mongo atlas
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.use('/users', userRoutes)


const server = require('http').createServer(app)
const io = require('socket.io', (server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
}))

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})