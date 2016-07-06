import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RDExample} from './components/ResponsiveDesign';

require('./style/main.scss');

class ResDExample extends React.Component<any,any> {

    render () {
        return (
            <RDExample>
            </RDExample>
        )
    }
}

ReactDOM.render(<ResDExample />, document.getElementById("rdexmaple"));