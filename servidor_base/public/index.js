console.log("hello world");

const socket = io();

// socket.emit("message", "Mensaje desde frontend")

// socket.on("message", (data)=>{
//     console.log(data)
// })

// socket.emit("message-server", (data)=>{
//     console.log(data)
// })

// socket.on("input-changed", (data)=>{
//     const textInput = document.getElementById('received-text')
//     textInput.innerHTML = data

// })

// const textInput = document.getElementById("text-input")
// textInput.addEventListener("input", (ev)=>{
//     socket.emit("input-changed", ev.target.value)
// })

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("input", (ev) => {
  socket.emit("input-message", ev.target.value);
});

const inputMessage = document.getElementById("input-message")
socket.on("input-message", (data) => {
    inputMessage.innerText = data
})

const sendButton = document.getElementById("send-button")
sendButton.addEventListener("click", (ev)=>{
    socket.emit("chat-message", chatInput.value)
})

const chatMessage = document.getElementById("input-chat")
socket.on("update-input-chat", (data) =>{
    chatMessage.innerHTML = ""

    for(const el of data){
        const li = document.createElement("li")
        li.innerText = `${el.socketId}: ${el.message}`
        chatMessage.appendChild(li)
    }
})