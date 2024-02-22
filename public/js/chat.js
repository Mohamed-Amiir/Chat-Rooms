const socket = io();
const chat = document.getElementById("chatMessages");
const chatForm = document.getElementById("chat-form");
const input = document.getElementById("msg");
socket.on("message", (message) => {
  var newElement = document.createElement("p");
  newElement.className = "announcment";
  newElement.textContent = message.text;
  chat.appendChild(newElement);
});
socket.on("MESSAGE", (message) => {
  outputMessage(message);

  //scroll down
  chat.scrollTop = chat.scrollHeight;
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const messge = event.target.elements.msg.value;
  //get the msg from front end and send it to server side
  socket.emit("chatMessage", messge);
  event.target.elements.msg.value = "";
  event.target.elements.msg.focus();

  // console.log(messge);
});

function outputMessage(message) {
  //Recieve the message from the server side
  var newElement = document.createElement("div");
  newElement.className = "message";
  newElement.innerHTML = `
    <p class="meta">${message.userName}  <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
  `;
  chat.appendChild(newElement);
}
