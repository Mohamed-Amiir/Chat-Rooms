type user = {
  userName: string;
  id: any;
  room: string;
};
const users: user[] = [];

function userJoin(username: string, id: any, room: string) {
  const u = { userName: username, id: id, room: room };
  users.push(u);
  return u;
}

function getUser(id: any) {
  return users.find((user) => user.id === id);
}

function userLeave(id: any) {
  const index = users.findIndex((user) => user.id === id);
    return users.splice(index, 1)[0];
  
}
function getRoomUsers(room: string) {
  return users.filter((user) => user.room === room);
}
export default { userJoin, getUser, userLeave ,getRoomUsers};
