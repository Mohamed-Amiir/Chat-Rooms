"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3000;
const io = new socket_io_1.default.Server(server);
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "../dist")));
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
//# sourceMappingURL=server.js.map