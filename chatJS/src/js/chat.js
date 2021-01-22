"use strict"
const socket = io();
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");
const userImg = document.querySelector(".UserImg");


//
// var num = 1;
// function image_onclick(idx){
//     if(idx){
//         if( num === 6){
//             num = 1;
//         }
//         num++;
//     }
//     userImg.setAttribute("src","/img/" + num+ ".jpg");
// }



chatInput.addEventListener("keypress",(event)=>{
    if(event.keyCode === 13){
        send();
    }
});

function send(){
    const param = {
        name: nickname.value,
        msg: chatInput.value,
        // img:
    };
    socket.emit("chatting",param);
    chatInput.value = "";
    chatInput.focus();
    console.log();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
}

sendButton.addEventListener("click",send);

//서버에서 보낸 내용을 확인
socket.on("chatting", (data)=>{
    const {name, msg, time } = data;
    const item = new LiModel(name, msg, time );
    item.makeLi();
});



let i =1;
document.querySelector(".UserImg").addEventListener('click',function(idx){
    if(idx){
        if(i === 5){
            i = 0;
        }
        i++;
        userImg.setAttribute("src",`/img/${i}.jpg`);
        console.log(userImg);

    }
});


function LiModel(name, msg, time ) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        // const profileSpan = document.createElement("span");
        // const messageSpan = document.createElement('span')
        // const timeSpan = document.createElement("span");

        const dom = `<span class="profile">
              <span class="user">${this.name}</span>
              <img
                src=${userImg.src}
                alt="any"
                class="image"
              />
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    };
}