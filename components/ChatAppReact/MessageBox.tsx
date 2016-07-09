import * as React from 'react';

export class MessageBox extends React.Component<any,any> {

    render () {

        return (
            <div className = "message-box">
                {this.props.incomingMessage}
            </div>
        );
    }
}