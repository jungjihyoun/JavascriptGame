//서버 js
const express = require("express");
const http = require("http");
const app = express();   //express를 실행한 내용을 app에 담음
const path = require("path");
const server = http.createServer(app);  //express가 http를 통해 실행될 수 있게
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);  //io를 통해 메세지 받아와서 제어

app.use(express.static(path.join(__dirname,"src")));
const PORT = process.env.PROT || 5000;


//채팅 받음(서버)
io.on("connection", (socket)=>{
       socket.on("chatting", (data)=>{
           const {name , msg} = data;
            io.emit("chatting", {
              name: name,
              msg: msg,
              time: moment(new Date()).format("h:mm A")
          });
       });
    });








server.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`);
});
