import io from 'socket.io-client';

const socket = io("http://localhost:5001");

const joinChat = (nickName, roomId) => {
    socket.emit('joinChat', { nickName, roomId });
    socket.on('message', message => {
        console.log(message);
    });
}

const sendMessage = (msg) => {
    socket.emit('chatMessage', msg);
}

export {joinChat, sendMessage};