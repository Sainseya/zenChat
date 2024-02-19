const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const serverRoutes = require("./routes/serverRoutes");


const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express()
dotenv.config()

app.use(express.json()) // Accepte JSON Data
app.use(cors())

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/server", serverRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected", userData._id);
        console.log(userData._id)
    });

    socket.on("join", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    // socket.on("typing", (room) => socket.in(room).emit("typing"));
    // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        io.emit("message received", newMessageRecieved);
        console.log("NEW " + newMessageRecieved)
    });
});