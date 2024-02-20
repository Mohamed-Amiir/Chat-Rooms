const socket = io();
const chat = document.getElementById("chatMessages");

socket.on("message", (message) => {
  var newElement = document.createElement('p');
  newElement.className = "announcment"
  newElement.textContent = message;
  chat.appendChild(newElement);
});
// socket.on("message", (message) => {
//   console.log(message);
// });
