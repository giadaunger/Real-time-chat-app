const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUser } = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

//Skapar en admin användare som skickar meddelanden som "välkommen ..." osv
const bot = "Admin Bot";

io.on("connection", socket => {
    socket.on("joinRoom", ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        //Välkoms meddelande till den personen som går in i ett chattrum
        socket.emit("message", formatMessage(bot, "Welcome to ChatRoom!"));

        //Skickar ett meddelande till alla förutom den personen som gick med i chattrummet
         socket.broadcast.to(user.room).emit("message", formatMessage(bot, `${user.username} has joined the chat`));

        //Info om vem som är med i rummet
        io.to(user.room).emit("roomUers", {
            room: user.room,
            users: getRoomUser(user.room), 
        })
    });

    //lyssnar efter meddelanden som skickas
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.io);

        //Gör meddelandet synligt för alla
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    //Skickar meddelande till alla att en person har lämnat chattrummet
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit("message", formatMessage(bot, `${user.username } has left the chat`));

            //Info om vem som är med i rummet
        io.to(user.room).emit("roomUers", {
            room: user.room,
            users: getRoomUser(user.room), 
        })
        }
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));