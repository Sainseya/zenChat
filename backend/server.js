const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const serverRoutes = require("./routes/serverRoutes");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express() 
dotenv.config()

app.use(cors())

// var allowlist = ['https://zenchat-61rp.onrender.com/', 'http://localhost:5000/']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use(express.json()) // Accepte JSON Data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/server", serverRoutes);

// ---------Deployement-----------------------------------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", corsOptionsDelegate(), (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

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

    socket.on("new message", (newMessageRecieved) => {
        io.emit("message received", newMessageRecieved);
        console.log("NEW " + newMessageRecieved)
    });
});