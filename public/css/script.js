const socket = io();

let output = document.querySelector(".messages");
let mensaje = document.querySelector(".input input");
let boton = document.querySelector(".button button");

boton.addEventListener("click", ()=> {
    socket.emit("mensaje", {
        message: mensaje.value
    })
})

socket.on("mensaje", (data)=>{
    output.innerHTML += `<p>${socket.id} ${data.data.message}</p>`;
})