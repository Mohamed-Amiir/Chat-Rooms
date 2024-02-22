"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [];
function userJoin(username, id, room) {
    const u = { userName: username, id: id, room: room };
    users.push(u);
    return u;
}
function getUser(id) {
    return users.find((user) => user.id === id);
}
function userLeave(id) {
    const index = users.findIndex((user) => user.id === id);
    return users.splice(index, 1)[0];
}
function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
}
exports.default = { userJoin, getUser, userLeave, getRoomUsers };
//# sourceMappingURL=user.js.map