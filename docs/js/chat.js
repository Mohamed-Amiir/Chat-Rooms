const socket = io();
const chat = document.getElementById("chatMessages");
const chatForm = document.getElementById("chat-form");
const input = document.getElementById("msg");
const roomName = document.getElementById("room-name");
const users = document.getElementById("users");
//Get the username and room name from url
const { name, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
const username = name;

// Join Room
socket.emit("joinRoom", { username, room });

//get room and users
socket.on("roomUsers", (info) => {
  users.innerText = "";
  roomName.innerText = info.room;
  for (let i = 0; i < info.users.length; i++) {
    let x = document.createElement("li");
    x.innerText = info.users[i].userName;
    users.append(x);
  }
});

// console.log(username, room);
//chat bot messages
socket.on("message", (message) => {
  var newElement = document.createElement("p");
  newElement.className = "announcment";
  newElement.textContent = message.text;
  chat.appendChild(newElement);
  // console.log("Hello");
});

socket.on("MESSAGE", (message) => {
  outputMessage(message);
  //scroll down
  chat.scrollTop = chat.scrollHeight;
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const messge = {
    text: event.target.elements.msg.value,
    user: username,
    room: room,
  };
  //get the msg from front end and send it to server side
  socket.emit("chatMessage", messge);
  event.target.elements.msg.value = "";
  event.target.elements.msg.focus();

  // console.log(messge);
});

function outputMessage(message) {
  //Recieve the message from the server side
  var newElement = document.createElement("div");
  newElement.className = message.userName === username ? "sent-message" : "message";
  newElement.innerHTML = `
    <p class="meta">${message.userName}  <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
  `;
  chat.appendChild(newElement);
}
