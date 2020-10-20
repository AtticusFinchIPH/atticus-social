import { userJoin, getCurrentUser, userLeave } from "./user";
import { formatMessage } from "./message";

const BOT_NAME = "ChatBot";

export default (socket, io) => {
    socket.on('joinChat', ({nickName, roomId}) => {
        console.log(`${nickName} joins in room ${roomId}.`);
        const user = userJoin(socket.id, nickName, roomId);
        socket.join(user.roomId);
        socket.emit('message', formatMessage(BOT_NAME, "You can start your conservation!"));
        // socket.broadcast.to(user.roomId).emit('message', formatMessage(BOT_NAME, `${user.nickName} has joined the chat`));
    });

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.roomId).emit('message', formatMessage(user.nickName, msg));
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
        }
    });
}