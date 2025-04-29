const socket = io();

const name = prompt("enter your name")



socket.emit('new-user-joined',name)

const message_container = document.querySelector('.message_container')
const input = document.querySelector('input')
const form = document.querySelector('form')

socket.on('user-joined',(data)=>{
    let user = document.createElement('div')
    user.innerText = `${data} joined the chat`;
    user.className = 'left'
    message_container.appendChild(user)
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let message = input.value;
    let my = document.createElement('div')
    my.className = 'right'
    my.innerText = message
    message_container.appendChild(my)
    socket.emit('send',message)
    input.value = ''
})

socket.on('recived',(data)=>{
 
   let text  = document.createElement('div')
   text.className = 'left'
   text.innerText = `${data.name}: ${data.message}`
   message_container.appendChild(text)
   
})

socket.on('user-disconnect',(data)=>{
    let text  = document.createElement('div')
    text.className = 'left'
    text.innerText = `${data} has left the chat`
    message_container.appendChild(text)
})