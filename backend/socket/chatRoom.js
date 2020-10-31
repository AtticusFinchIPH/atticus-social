const users = [];

const userJoin = (socketId, nickName, roomId) => {
    const user = {socketId, nickName, roomId}
    users.push(user);
    return user;
}

const getRoomUsers = (roomId) => {
    return users.filter(user => user.roomId === roomId);
}

const getCurrentUser = (socketId) => {
    return users.find(user => user.socketId === socketId);
}

const userLeave = (socketId) => {
    const index = users.findIndex(user => user.socketId === socketId);
    if(index !== -1) return users.splice(index, 1)[0];
}

const getUsers = () => users;

export {userJoin, getRoomUsers, getCurrentUser, userLeave, getUsers};