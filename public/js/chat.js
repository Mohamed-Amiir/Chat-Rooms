const socket = io();
const chat = document.getElementById("chatMessages");
const chatForm = document.getElementById("chat-form");

socket.on("message", (message) => {
  var newElement = document.createElement("p");
  newElement.className = "announcment";
  newElement.textContent = message;
  chat.appendChild(newElement);
});
socket.on("MESSAGE", (message) => {
  outputMessage(message);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const messge = event.target.elements.msg.value;
  //get the msg from front end and send it to server side
  socket.emit("chatMessage", messge);
  
  // console.log(messge);
});


function outputMessage(message){
//Recieve the message from the server side 
  var newElement = document.createElement("div");
  newElement.className = "message";
  newElement.innerHTML = `
    <p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
      ${message}
    </p>
  `;
  chat.appendChild(newElement);
}