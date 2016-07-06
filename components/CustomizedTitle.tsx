import * as React from 'react';

export class CustomizedTitle extends React.Component<any, any> {
    constructor() {
        super();
    }

    onTextClick() {
        this.props.onTextClick();
    }

    render() {
        return (
            <div className="wrapper">
                <div className="clip-text clip-text_one">
                    <text className = "text-title" onClick = {(e) => this.onTextClick()}>
                        MIRA
                    </text>
                </div>
            </div>
        )
    }
}