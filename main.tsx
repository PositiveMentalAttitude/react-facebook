import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ObjectChatting} from './components/ObjectChatting/ObjectChatting';

require('./style/main.scss');

class App extends React.Component<any, any> {

    render() {
        return (
            <div className = "app-container">
                <ObjectChatting>
                </ObjectChatting>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));