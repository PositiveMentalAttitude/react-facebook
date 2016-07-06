import * as React from 'react';

export class TestES6 extends React.Component<any,any> {
    constructor() {
        super();
        this.state = {
            testES6: "Welcome",
            state2: "state2"
        }        
    }

    changeState(testES6,state2) {
        this.setState({testES6,state2});
    }

    render() {
        setTimeout(() => {
            this.changeState("CHANGED","CHANGED");
        },3000);

        return (
            <div className ="test-es6">
                {this.state.testES6} <br/>
                {this.state.state2}
            </div>
        )
    }
}