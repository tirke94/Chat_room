//user interface

export class ChatUi {
    #list;
    constructor(l) {
        this.list = l
    }

    set list(l) {
        this.#list = l
    }
    get list() {
        return this.#list
    }

    templateLi(data) {
        let klasa = (data.username === localStorage.getItem('chatroom.username')) ? 'trenutniUser' : ''

        let htmlLi =
            `<li class="${klasa}">
             <span class="username"> ${data.username}: </span>
             <span class="message"> ${data.message}</span>
             <div class="date">${this.formaVreme(data)}</div>
        </li>
        `
        // data.created_at.toDate().toDateString()
        this.list.innerHTML += htmlLi
    }
    //formatiranje vremena pa ga ubacujemo iznad
    formaVreme(data) {
        let danasnjiDatum = new Date()
        let danas = danasnjiDatum.getDate()
        let datum = data.created_at.toDate()
        let d = datum.getDate()
        let m = datum.getMonth() + 1
        let godina = datum.getFullYear()
        let h = datum.getHours()
        let min = datum.getMinutes()
        d = String(d).padStart(2, "0")
        m = String(m).padStart(2, "0")
        h = String(h).padStart(2, "0")
        min = String(min).padStart(2, "0")
        if (d == danas) {
            let ispisVreme = `${h}:${min}`
            return ispisVreme
        }
        let ispisVreme = `${d}.${m}.${godina}. - ${h}:${min}`
        return ispisVreme
    }

    clearUl() {
        this.list.innerHTML = "";
    }
}