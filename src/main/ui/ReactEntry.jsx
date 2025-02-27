import React from "react";
import {FirstReactComponent} from "./component/FirstReactComponent";
import * as ReactDOM from 'react-dom';
import './styles/SpecCourseStyles.css'
import {ReactComponentWithRestExample} from "./component/ReactComponentWithRestExample";
import {TestTableComponent} from "./component/TestTableComponent";

console.log('hello from js world!');

const ReactApp = () => {
    return (
        <div>
            <hr />
            <TestTableComponent />
            <hr />
            FirstReactComponent:
            <FirstReactComponent />
            <hr />
            ReactComponentWithRestExample:
            <ReactComponentWithRestExample />
        </div>
    )
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));