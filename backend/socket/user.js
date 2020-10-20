const users = [];

const userJoin = (socketId, nickname, roomId) => {
    const user = {socketId, nickname, roomId}
    users.push(user);
    return user;
}

const getRoomUsers = (roomId) => {
    return users.filter(user => user.roomId === roomId);
}

export {userJoin, getRoomUsers};