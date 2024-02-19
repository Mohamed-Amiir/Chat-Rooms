import io from 'socket.io-client';

const socket = io();
socket.on("message", (message: string) => {
  console.log(message);
});
