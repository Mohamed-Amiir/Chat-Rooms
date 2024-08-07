import express from "express";
import path from "path";
import http from "http";
import socketIO from "socket.io";
import formatMessage from "./util/message.js";
import USER from "./util/user.js";
import User from "./routers/userRouter.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
/********************************************************************************/

/********************************************************************************/

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = new socketIO.Server(server);
app.use(express.json());

app.use("/user", User);
app.use(express.static(path.join(__dirname, "../docs")));
// Parse JSON bodies
mongoose
  .connect(
    "mongodb+srv://mooamir90:AW6Z3POaGXp2Gpm0@mohamed-amir.u5otilt.mongodb.net/chat?retryWrites=true&w=majority&appName=Mohamed-Amir",
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as any
  )
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((err: any) => {
    console.error("Error connecting to database:", err);
  });

//Run when client connects
io.on("connection", (socket) => {
  //joining room
  socket.on("joinRoom", ({ username, room }) => {
    const user = USER.userJoin(username, socket.id, room);
    socket.join(user.room);

    //Welcome new users
    socket.emit(
      "message",
      formatMessage("ChatBot", `${user.userName}, Welcom to our Chat Room!`)
    );
    //Broadcast when new user join
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("ChatBot", `${user.userName} has joined the chat`)
      );
    //Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: USER.getRoomUsers(user.room),
    });
  });

  //Listen for chat messages from the client side
  socket.on("chatMessage", (msg) => {
    // Send message to the client side
    io.to(msg.room).emit("MESSAGE", formatMessage(msg.user, msg.text));
  });

  //when user leave chat
  socket.on("disconnect", () => {
    const user = USER.userLeave(socket.id);
    io.to(user.room).emit(
      "message",
      formatMessage("ChatBot", `${user.userName} has left the chat !!`)
    );
    //Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: USER.getRoomUsers(user.room),
    });
  });
  // console.log("hello world");
  // io.emit("message", "Whatsapp ya regaalla");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/index.html"));
});
// Endpoint to handle login
app.post("/login", (req, res) => {
  // Assuming you have code to authenticate the user
  // After successful authentication, redirect to home page
  res.redirect("/home");
});

// Route to serve home.html after login
app.get("/home", (req, res) => {
  // Assuming you have middleware to authenticate the user and attach user data to the request
  // If user is authenticated, serve home.html, otherwise redirect to login page
  res.sendFile(path.join(__dirname, "../docs/home.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/signup.html"));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Your Express routes and configurations can follow
