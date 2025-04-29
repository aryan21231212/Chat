const express = require("express")
const { connect } = require("http2")
const app = express()
const path = require("path")

const server = app.listen(3000,()=>{
    console.log("server listening on port 3000")
})

const io = require('socket.io')(server);

app.set('view engine',"ejs")
app.set('views',path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,'/public')))
app.get('/',(req,res)=>{
    res.render("index.ejs")
})

const users = {}


io.on("connection",(client)=>{
    console.log("connected");
    client.on('new-user-joined',(name)=>{
        users[client.id] = name;
        console.log(`new user joined ${name}`)
        client.broadcast.emit('user-joined',name)
        console.log(users)
    })
    client.on('send',(data)=>{
        client.broadcast.emit('recived',{message:data,name:users[client.id]})
    })
    client.on('disconnect',()=>{
        const user = users[client.id];
        if(user){
            client.broadcast.emit('user-disconnect',user)
            delete users[client.id]
        }
    })

})

