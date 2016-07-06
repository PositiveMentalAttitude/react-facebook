import * as React from 'react';
import {EventEmitter} from 'events';
import {Action} from './Action';

export var actionEmitter = new EventEmitter();

export class ObjectInfo extends React.Component<any,any> {
    constructor() {
        super();

        this.state = {
            active: false
        };       
    }

    objectInforBox:HTMLDivElement = null;

    componentDidUpdate() {
        if (this.props.active == true) {
            this.objectInforBox.style.backgroundColor = 'blue';
        } else {
            this.objectInforBox.style.backgroundColor = 'gray';
        }
    }

    changeObjectStatus(state) {
        this.setState({active : state});
    }

    passObjectIDToStore() {
        var action = new Action();

        action.changeObjectStatus(this.props.objectID);
    }

    render () {

        return(
            <div className = "object-info-box" ref = {(r) => this.objectInforBox = r}
                onClick = {(e) => this.passObjectIDToStore()}>
                Object
            </div>
        )
    }
}