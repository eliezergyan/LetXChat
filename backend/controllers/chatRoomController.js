const ChatRoom = require('../models/ChatRoom');

const createChatRoom = async (req, res) => {
    try {
        const { name, members, createdBy } = req.body;
        const chatroom = await ChatRoom.create({ name, members, createdBy });
        res.status(201).json(chatroom);
        
    } catch (error) {
        console.log(error)
    }
    
}

const getChatRooms = async (req, res) => {
    try {
        const chatrooms = await ChatRoom.find();
        res.json(chatrooms)   
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    createChatRoom,
    getChatRooms
}