import * as React from 'react';

export class MessageBox extends React.Component<any, any> {

    render() {

        return (
            <div className = "message-generator">
                <div className = "message-generator-left">
                    <text className = "message-content-left">
                    </text>
                    <text className = "message-time-display-left">
                    </text>
                </div>
                <div className = "message-generator-right">
                    <text className = "message-content-right">
                    </text>
                    <text className = "message-time-display-right">
                    </text>
                </div>
            </div>
        );
    }
}
