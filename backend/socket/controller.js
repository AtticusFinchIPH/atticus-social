import { userJoin, getCurrentUser, userLeave, getUsers } from "./chatRoom";
import { formatMessage } from "./message";

const BOT_NAME = "ChatBot";

export default (socket, io) => {
    socket.on('joinChat', ({joiner, isPrivate, participants}) => {
        console.log(`${joiner} joins in room ${}.`);
        const user = userJoin(socket.id, nickName, roomId);      
        socket.join(user.roomId);
        socket.emit('message', formatMessage(BOT_NAME, "You can start your conservation!"));
        // socket.broadcast.to(user.roomId).emit('message', formatMessage(BOT_NAME, `${user.nickName} has joined the chat`));
    });

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        if(user) io.to(user.roomId).emit('message', formatMessage(user.nickName, msg));
    })

    socket.on('disconnect', () => {
        console.log("User left")
        const user = userLeave(socket.id);
        if(user){
        }
    });
}