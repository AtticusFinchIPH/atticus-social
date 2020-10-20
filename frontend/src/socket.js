import io from 'socket.io-client';

const socket = io("http://localhost:5001");

const joinChat = (nickname, roomId) => {
    socket.emit('joinChat', { nickname, roomId });
}

export {joinChat};