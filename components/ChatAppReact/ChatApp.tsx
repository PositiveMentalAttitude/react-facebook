import * as React from 'react';

export class ChatApp extends React.Component<any, any> {
    constructor() {
        super();

    }

    inputChatName: HTMLInputElement = null;
    textArea: HTMLTextAreaElement = null;
    socket = null;
    chatStatus:HTMLSpanElement = null;
    // getNode(s) {
    //     return document.querySelector(s);
    // }

    //Get required nodes

    componentWillMount() {
        try {
            this.socket = window["io"].connect('http://127.0.0.1:9000');
        } catch (error) {
            console.log(error.ToString());
        }
    }

    statusDefault = null;

    componentDidMount() {
        if (this.socket !== undefined) {
            console.log("OK !!!");
        }

        this.statusDefault = this.chatStatus.textContent;

        //Listen to status
        this.socket.on('status', (data) => {
            this.setStatus((typeof(data) === 'object') ? data.message : data);

            if (data.clear === true) {
                this.textArea.value = '';
            }
        })
    }

    setStatus(s:string) {
        this.chatStatus.textContent = s;

        if (s !== this.statusDefault) {
            var delay = setTimeout(() => {
                this.setStatus(this.statusDefault);
                clearInterval(delay);
            },3000)
        }
    }

    //Handle Enter Keydown Event 
    handleEnterKeyDown(e:React.KeyboardEvent) {

        if (e.which === 13 && e.shiftKey === false) {
            this.socket.emit('input',{
                name: this.inputChatName.value,
                message: this.textArea.value
            })
            console.log("TA DA");

            e.preventDefault();
        }
    }

    render() {

        return (
            <div className = "chat-app">
                <input type="text" className = "chat-name" placeholder = "Enter your name"
                    ref = {(r) => this.inputChatName = r}/>
                <div className = "chat-messages">
                    <div className = "chat-message">
                        Hello!
                    </div>
                    <div className = "chat-message">
                        Hello there!
                    </div>
                </div>
                <textarea placeholder = "Type your message" className = "chat-textarea"
                    ref = {(r) => this.textArea = r} onKeyDown = {(e) => this.handleEnterKeyDown(e)}>
                </textarea>
                <div className = "chat-status">
                    Status: <span ref = {(r) => this.chatStatus = r}>Idle</span>
                </div>
            </div>
        );
    }
}