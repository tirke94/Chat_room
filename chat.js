class Chatroom {
    #room;
    #username;
    constructor(r, u) {
        this.room = r;
        this.username = u;
        this.chats = db.collection('chats')
        this.unsub; // Bice undefined prilikom kreiranja objekta

    }
    get room() {
        return this.#room
    }
    set room(r) {
        if (r.length > 0 && r.length < 20) {
            this.#room = r
        } else {
            this.#room = "Naziv kanala ne moze da sadrzi vise od 20 karaktera"
            alert("Naziv kanala ne moze da sadrzi vise od 20 karaktera")
        }
    }
    get username() {
        return this.#username
    }
    set username(u) {
        if (u) {
            if (u.length >= 2 && u.length <= 10) {
                if (u.includes(' ') == false) {
                    this.#username = u
                    localStorage.setItem("chatroom.username", u) //izmena zbog local storage
                } else {
                    alert("Nevalidno uneto korisnicko ime")
                }
            } else {
                alert("Nevalidno uneto korisnicko ime")
            }
        }else{
            alert("Nevalidno uneto korisnicko ime")
        }
    }
    //update sobe
    updateRoom(ur){
        this.room = ur; //pozove seter i promeni sobu
        if(this.unsub){
            this.unsub()
        }
    }


    //metod za dodavanje chat/asinhrona
    async addChat(poruka) {
        let datum = new Date()


        let docChat = {
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(datum),
            message: poruka,
            room: this.room
        };

        let response = await this.chats.add(docChat)
        return response
    }
    //pracenje poruka u bazi i ispis dodatih poruka
    getChats(callback) {
        this.unsub = this.chats
        .orderBy("created_at")
        .where('room', '==', this.room)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type == "added") { //console
                    // console.log(change.doc.data()); //ceo objekat
                    callback(change.doc.data())
                }
            })
        })
    }

}

export { Chatroom };

