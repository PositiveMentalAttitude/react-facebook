import * as React from 'react';
import {MessageBox} from './MessageBox';

export class ChatApp extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            messageCount : 0
        }
    }

    inputChatName: HTMLInputElement = null;
    textArea: HTMLTextAreaElement = null;
    socket = null;
    chatStatus: HTMLSpanElement = null;
    messageArray = [];

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
        this.statusDefault = this.chatStatus.textContent;

        if (this.socket !== undefined) {
            console.log("OK !!!");

            
            //Listen to status
            this.socket.on('output', (data) => {
                console.log(data);
                console.log(data.length);
                if (data.length) {
                    //Loop through results
                    for (var x = 0; x < data.length; x++) {
                        var message = <MessageBox incomingMessage = {data[x].name + ': ' + data[x].message}/>
                        this.messageArray.push(message);
                        this.setState({messageCount : this.messageArray.length})
                    }
                }
            })

            //Listen to status
            this.socket.on('status', (data) => {
                this.setStatus((typeof (data) === 'object') ? data.message : data);

                if (data.clear === true) {
                    this.textArea.value = '';
                }
            })
        }
    }

    setStatus(s: string) {
        this.chatStatus.textContent = s;

        if (s !== this.statusDefault) {
            var delay = setTimeout(() => {
                this.setStatus(this.statusDefault);
                clearInterval(delay);
            }, 3000)
        }
    }

    //Handle Enter Keydown Event 
    handleEnterKeyDown(e: React.KeyboardEvent) {

        if (e.which === 13 && e.shiftKey === false) {
            this.socket.emit('input', {
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
                    {this.messageArray}
                </div>
                <textarea placeholder = "Type your message" className = "chat-textarea"
                    ref = {(r) => this.textArea = r} onKeyDown = {(e) => this.handleEnterKeyDown(e) }>
                </textarea>
                <div className = "chat-status">
                    Status: <span ref = {(r) => this.chatStatus = r}>Idle</span>
                </div>
            </div>
        );
    }
}