import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import {ObjectChatting} from './components/ObjectChatting/ObjectChatting';
import {ChatApp} from './components/ChatAppReact/ChatApp';

require('./style/main.scss');



class App extends React.Component<any, any> {

    render() {
        return (
            <div className = "app-container">
                <ChatApp>
                </ChatApp>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));