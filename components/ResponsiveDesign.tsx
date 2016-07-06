import * as React from 'react';
import {LoginPopup} from './LoginPopup';
import {CustomizedTitle} from './CustomizedTitle'

export class RDExample extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            showPopup: false
        }
    }

    setShowPopupState() {
        this.setState({
            showPopup: true
        });
    }

    turnOnLoginPopup() {
        var showPopup;
        if (this.state.showPopup) {
            return showPopup = <LoginPopup turnOffPopup = {(e) => this.turnOffPopup(e)}></LoginPopup>;
        } else {
            return null;
        }
    }

    turnOffPopup(e: React.MouseEvent) {
        this.setState({
            showPopup: false
        })
    }

    render() {
        return (
            <div className = "responsive-design-example">
                <CustomizedTitle onTextClick = {(e) => this.setState({showPopup: true}) }>
                </CustomizedTitle>
                {this.turnOnLoginPopup()}
            </div>
        )
    }
}

