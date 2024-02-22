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
