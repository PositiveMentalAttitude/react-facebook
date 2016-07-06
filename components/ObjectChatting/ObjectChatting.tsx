import * as React from 'react';
import {Action} from './Action';
import {storeMessage, CHANGE_EVENT, todoStore,OBJECT_CHANGE_EVENT, objectState} from './AppStore';
import {ObjectInfo , actionEmitter} from './ObjectInfo';

const ObjectInfo1:string = "object-info-1";
const ObjectInfo2:string = "object-info-2";
const ObjectInfo3:string = "object-info-3";

export class ObjectChatting extends React.Component<any, any> {
    genMess: HTMLInputElement = null;

    objectInfo_1 = null;
    objectInfo_2 = null;
    objectInfo_3 = null;

    constructor() {
        super();
        this.state = {
            store: [],
            objectChange : 0
        }
    }

    componentDidMount() {
        todoStore.addListener(CHANGE_EVENT, this.handleChange);

        todoStore.addListener(OBJECT_CHANGE_EVENT, this.handleObjectStatusChange);
    }

    handleObjectStatusChange = () => {
        console.log(objectState);
        this.setState({objectChange : objectState});
    }

    handleChange = () => {
        this.setState({ store: storeMessage });
    }

    createMessage(e: React.KeyboardEvent) {
        if (e.keyCode != 13) {
            return;
        }
        var action = new Action();
        action.createMessage(this.genMess.value);

        this.genMess.value = null;
    }

    render() {
        var messageArray = [];
        for (var key in this.state.store) {
            var messageElement = <div key = {key}>{this.state.store[key]}</div>;
            messageArray.push(messageElement);
        }

        var object1_active = (this.state.objectChange == 1);
        var object2_active = (this.state.objectChange == 2);
        var object3_active = (this.state.objectChange == 3);

        return (
            <div className = "object-chatting">
                <div className = "object-box">
                    <ObjectInfo className = "object-info-1" objectID = {"object-info-1"}
                        ref = {r => {this.objectInfo_1 = r}} active = {object1_active}>
                    </ObjectInfo>
                    <ObjectInfo className = "object-info-2" objectID = {"object-info-2"}
                        ref = {r => {this.objectInfo_2 = r}} active = {object2_active}>
                    </ObjectInfo>
                    <ObjectInfo className = "object-info-3" objectID = {"object-info-3"}
                        ref = {r => {this.objectInfo_3 = r}} active = {object3_active}>
                    </ObjectInfo>
                </div>
                <div className = "message-box">
                    <div className = "message-display">
                    </div>
                    <input className = "message-input" type="text" placeholder = "Type a message" ref = {d => this.genMess = d}
                        onKeyDown = {e => this.createMessage(e) } />
                    {messageArray}
                </div>
            </div>
        );
    }
}