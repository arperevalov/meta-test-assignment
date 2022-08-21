class SystemMessages {
    constructor() {
        // this.messages = [];
        this.messagesLifetime = 2000;
        this.messagesIDCounter = 0;
        this.messagesContainer = document.getElementById('js-system-messages-container');
    }

    setMessage(text) {
        let element = document.createElement("div");
        element.classList.add('system-messages__message')
        element.textContent = text;
        this.messagesContainer.appendChild(element);

        setTimeout(()=>{
            this.messagesContainer.removeChild(element);
        }, this.messagesLifetime)

        this.messagesIDCounter++;
    }
};

export default SystemMessages;