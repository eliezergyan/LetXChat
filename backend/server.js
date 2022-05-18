const express = require('express')
const app = express()
const colors = require('colors')
const cors = require('cors')

const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000 

// These chatroooms are hardcoded
// Make it dynamic
const rooms = ['general', 'tech', 'finance', 'crypto']

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/messages', require('./routes/messageRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'))
app.use('/api/chatrooms', require('./routes/chatRoomRoutes.js'))


app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the landing page"});
})

app.use(errorHandler)


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