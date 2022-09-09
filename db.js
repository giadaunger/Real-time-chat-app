const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite', (error) => {
    if (error) {
        console.error(error.message);
    }

    const roomQuery = `
    CREATE TABLE room (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roomName TEXT
    )
    `

    const userQuery = `
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT
    )
    `

    db.run(roomQuery, (error) => {
        if (error) {
            console.error(error.message);
        }});

        db.run(userQuery, (error) => {
            if (error) {
                console.error(error.message);
            }});
});

module.exports = db;