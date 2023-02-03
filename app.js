import { Chatroom } from "./chat.js";
import { ChatUi } from "./ui.js";

//DOM
let ul = document.querySelector('ul');
let inputSend = document.querySelector("#inputMessage")
let btnSend = document.querySelector("#btnSend")
let inputUpdate = document.querySelector("#inputUsername")
let btnUpdate = document.querySelector("#btnUpdate")
let navRooms = document.querySelector('nav')


let username = localStorage.getItem("chatroom.username")
if (username == null) {
    username = "Anonimus"
}

let chatroom = new Chatroom('#general', username)  //obj chatroom klase
let chatUI = new ChatUi(ul);  //user interfejs

chatroom.getChats(data => {  //ispis na stranici
    chatUI.templateLi(data)
})


btnSend.addEventListener('click', () => {   //slanje poruke
    if (inputSend.value != "") {
        chatroom.addChat(inputSend.value)
            .then(() => {
                console.log("Uspesno dodat chat");
            })
            .catch((e) => {
                console.log(e);
            })
        inputSend.value = ''
    }
})


btnUpdate.addEventListener('click', () => {  //menjanje user-a
    chatroom.username = inputUpdate.value

    let newUser = document.querySelector("#newUser")
    newUser.innerHTML = `Dobrodosli <span id="updateUser">${inputUpdate.value}<span>.`

    inputUpdate.value = ''

    chatUI.clearUl();
    chatroom.getChats(data => {
        chatUI.templateLi(data)
    })
    setTimeout(() => {
        newUser.innerHTML = ""
    }, 3000)

})
//rooms

navRooms.addEventListener("click", e => {
    if (e.target.tagName == "BUTTON") {

        let newRoom = e.target.textContent
        chatroom.updateRoom(newRoom)

        chatUI.clearUl();  //izbrisati sve poruke sa ekrana
        chatroom.getChats(data => { //prikazi chat-ove
            chatUI.templateLi(data)
        })
    }
})