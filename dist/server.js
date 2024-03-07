"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const message_js_1 = __importDefault(require("./util/message.js"));
const user_js_1 = __importDefault(require("./util/user.js"));
const userRouter_js_1 = __importDefault(require("./routers/userRouter.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3000;
const io = new socket_io_1.default.Server(server);
app.use(express_1.default.json());
app.use("/user", userRouter_js_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Parse JSON bodies
mongoose_1.default
    .connect("mongodb://localhost:27017/chat", {
// useNewUrlParser: true,
// useUnifiedTopology: true,
})
    .then(() => {
    console.log("Database Connected...");
})
    .catch((err) => {
    console.error("Error connecting to database:", err);
});
//Run when client connects
io.on("connection", (socket) => {
    //joining room
    socket.on("joinRoom", ({ username, room }) => {
        const user = user_js_1.default.userJoin(username, socket.id, room);
        socket.join(user.room);
        //Welcome new users
        socket.emit("message", (0, message_js_1.default)("ChatBot", `${user.userName}, Welcom to our Chat Room!`));
        //Broadcast when new user join
        socket.broadcast
            .to(user.room)
            .emit("message", (0, message_js_1.default)("ChatBot", `${user.userName} has joined the chat`));
        //Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: user_js_1.default.getRoomUsers(user.room),
        });
    });
    //Listen for chat messages from the client side
    socket.on("chatMessage", (msg) => {
        // Send message to the client side
        io.to(msg.room).emit("MESSAGE", (0, message_js_1.default)(msg.user, msg.text));
    });
    //when user leave chat
    socket.on("disconnect", () => {
        const user = user_js_1.default.userLeave(socket.id);
        io.to(user.room).emit("message", (0, message_js_1.default)("ChatBot", `${user.userName} has left the chat !!`));
        //Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: user_js_1.default.getRoomUsers(user.room),
        });
    });
    // console.log("hello world");
    // io.emit("message", "Whatsapp ya regaalla");
});
app.get("/signup", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/signup.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
app.get("/home", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/home.html"));
});
// app.get("/", (req, res) => {
//   res.redirect("/login");
// });
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Your Express routes and configurations can follow
//# sourceMappingURL=server.js.map