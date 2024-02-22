"use strict";
const users = [];
function userJoin(username, id, room) {
    const u = { userName: username, id: id, room: room };
    users.push(u);
    return u;
}
function getUser(id) {
    return users.find((user) => user.id === id);
}
//# sourceMappingURL=user.js.map