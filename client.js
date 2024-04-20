const socket = io("http://localhost:8000")

var name = prompt("Enter Your Name to Join The Chat : ")

socket.emit("user-joined", name)
const first = document.querySelector(".first")

function generateMessage(message, side) {
    const div = document.createElement("div")
    div.classList.add("alert")

    if (side === "left") {
        div.classList.add("alert-primary")
        div.classList.add("left")
    }
    else if (side === "right") {
        div.classList.add("alert-success")
        div.classList.add("right")
    }
    else {
        div.classList.add("alert-secondary")
        div.classList.add("center")
    }

    div.innerHTML = message
    first.appendChild(div)
}

socket.on("new-user-joined",name=>{
    if(name!="null")
    generateMessage(`${name} Joined the Chat`,"center")
})

socket.on("user-left",name=>{
    if(name!="null")
    generateMessage(`${name} Left the Chat`,"center")
})


function postMessage(){
    let input = document.getElementById("message")
    generateMessage(`${input.value} : You`,"right")

    socket.emit("send",input.value)

    input.value = ""
}

socket.on("receive",({message,name})=>{
    generateMessage(`${name} :  ${message}`,"left")
})
