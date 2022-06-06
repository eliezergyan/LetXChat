const path = require('path')
const express = require('express')
const app = express()
const colors = require('colors')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const chatRoomRoutes = require('./routes/chatRoomRoutes')
const { getChatRooms } = require('./controllers/chatRoomController')
 
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const Message = require('./models/Message')
const User = require('./models/User')
const port = process.env.PORT || 5000 


// Connect to mongo atlas
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


app.use('/users', userRoutes)
app.use('/chatroom', chatRoomRoutes)

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'https://letxchatapp.herokuapp.com/',
        methods: ['GET', 'POST']
    }
})

app.get('/rooms', getChatRooms)

// Upload media
const multer = require('multer')
const fs = require("fs"); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname)
    //     if(ext !== '.jpg' && ext !== '.png' && ext !== '.mp4'){
    //         return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //     }
    //     cb(null, true)
    // }
  })
  
const upload = multer({ storage: storage }).single("file")


app.post('/api/chat/uploadfiles', (req, res) => {
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path })
    });
})


// Get last messages from room
async function getLastMessagesFromRoom(room){
    let roomMessages = await Message.aggregate([
        {$match: {to: room}},
        {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ])
    return roomMessages;
}

// Sort messages by date
function sortRoomMessagesByDate(messages){
    return messages.sort(function(a, b){
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');

        date1 = date1[2] + date1[0] + date1[1];
        date2 = date2[2] + date2[0] + date2[1];

        return date1 < date2 ? -1 : 1
    })
}

// Socket connection
io.on('connection', (socket)=>{
    socket.on('new-user', async() => {
        const members = await User.find();
        io.emit('new-user', members)
    })

    socket.on('join-room', async(newRoom, previousRoom) => {
        socket.join(newRoom);
        socket.leave(previousRoom);
        let roomMessages = await getLastMessagesFromRoom(newRoom);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages)
    })
    socket.on('message-room', async(room, content, sender, time, date) => {
        console.log(content)
        const newMessage = await Message.create({content, from: sender, time, date, to: room});
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);

        // Sending message to room
        io.to(room).emit('room-messages', roomMessages);

        socket.broadcast.emit('notifications', room)
    })

    // Sending an image
    socket.on('base64 file', async (msg) => {
        console.log('received base64 file from ' + msg.username);
        socket.username = msg.username;
        // socket.broadcast.emit('base64 image', //exclude sender
        io.sockets.emit('base64 file',  //include sender
    
            {
              username: socket.username,
              file: msg.file,
              fileName: msg.fileName
            }
    
        );
    });



app.delete('/logout', async(req, res) => {
        try {
            const {_id, newMessages} = req.body;
            const user = await User.findById(_id);
            user.status = "offline";
            user.newMessages = newMessages;
            await user.save();
            const members = await User.find();
            socket.broadcast.emit('new-user', members);
            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    })
})


// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}


server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})