const rooms = [];

//Skapa ett rum
function createRoom(id, roomName) {
    const room = { id, roomName };
    rooms.push(room);
    return room;
}

//Hitta rummet
function getCurrentRoom(id) {
    return rooms.find(room => room.id === id);
}

//Radera rum
function deleteRoom(id) {
    const index = rooms.findIndex(room => room.id === id);
    if(index !== -1) {
        return rooms.splice(index, 1)[0]; 
    }
}

module.exports = {
    createRoom,
    getCurrentRoom,
    deleteRoom
}