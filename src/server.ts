import express from "express";
import path from "path";
import http from "http";
import socketIO from "socket.io";
import formatMessage from "./message.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = new socketIO.Server(server);

app.use(express.static(path.join(__dirname, "../public")));

//Run when client connects
io.on("connection", (socket) => {
  // console.log("New connection......");

  //Welcome new users
  socket.emit("message", formatMessage("ChatBot", "Welcom to our Chat Room!"));
  //Broadcast when new user join
  socket.broadcast.emit(
    "message",
    formatMessage("ChatBot", "Someone has joined the chat !!")
  );

  //when user leave chat
  socket.on("disconnect", () => {
    io.emit(
      "message",
      formatMessage("ChatBot", "Someone has left the chat !!")
    );
  });

  //Listen for chat messages from the client side
  socket.on("chatMessage", (msg) => {
    // Send message to the client side
    io.emit("MESSAGE", formatMessage("USER", msg));
  });

  // io.emit("message", "Whatsapp ya regaalla");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Your Express routes and configurations can follow
