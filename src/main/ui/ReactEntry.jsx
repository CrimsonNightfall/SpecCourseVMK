import React from "react";
import {FirstReactComponent} from "./component/FirstReactComponent";
import * as ReactDOM from 'react-dom';
import './styles/SpecCourseStyles.css'
import {ReactComponentWithRestExample} from "./component/ReactComponentWithRestExample";
import {TestTableComponent} from "./component/TestTableComponent";
import {ReactComponentWithNomenclature} from "./component/ReactComponentWithNomenclature";

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
            <hr />
            ReactComponentWithNomenclature:
            <ReactComponentWithNomenclature />
        </div>
    )
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));