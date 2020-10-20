import { userJoin, getRoomUsers } from "./user";
import { formatMessage } from "./message";

const BOT_NAME = "ChatBot";

export default (socket, io) => {
    socket.on('joinChat', ({nickname, roomId}) => {
        console.log(`${nickname} joins in room ${roomId}.`);
        const user = userJoin(socket.id, nickname, roomId);
        socket.join(user.roomId);
        socket.emit('message', formatMessage(BOT_NAME, 'Welcome to ChatCord!'));
        socket.broadcast.to(user.roomId).emit('message', formatMessage(BOT_NAME, `${user.nickname} has joined the chat`));
        io.to(user.roomId).emit('roomUsers', {
            room: user.roomId,
            users: getRoomUsers(user.roomId)
        })
    })   
}