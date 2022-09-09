const db = require('../db')

const users = [];

//Joina användare till chatt
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

//Hitta en användare
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

//Användare lämnar en chatt
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0]; 
    }
}

//Hitta rum
function getRoomUser(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUser
}