"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const message_js_1 = __importDefault(require("./message.js"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3000;
const io = new socket_io_1.default.Server(server);
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
//Run when client connects
io.on("connection", (socket) => {
    // console.log("New connection......");
    //Welcome new users
    socket.emit("message", (0, message_js_1.default)("ChatBot", "Welcom to our Chat Room!"));
    //Broadcast when new user join
    socket.broadcast.emit("message", (0, message_js_1.default)("ChatBot", "Someone has joined the chat !!"));
    //when user leave chat
    socket.on("disconnect", () => {
        io.emit("message", (0, message_js_1.default)("ChatBot", "Someone has left the chat !!"));
    });
    //Listen for chat messages from the client side
    socket.on("chatMessage", (msg) => {
        // Send message to the client side
        io.emit("MESSAGE", (0, message_js_1.default)("USER", msg));
    });
    // io.emit("message", "Whatsapp ya regaalla");
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Your Express routes and configurations can follow
//# sourceMappingURL=server.js.map