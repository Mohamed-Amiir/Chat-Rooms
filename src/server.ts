import express from "express";
import path from "path";
import http from "http";
import socketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = new socketIO.Server(server);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));

//Run when client connects
io.on("connection", (socket) => {
  console.log("New connection......");
  socket.emit("message", "Welcom to our Chat Room!");
  socket.broadcast.emit("message", "Someone has joined the chat !!");
  // io.emit("message", "Whatsapp ya regaalla");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Your Express routes and configurations can follow
