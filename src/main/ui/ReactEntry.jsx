import React from "react";
import * as ReactDOM from 'react-dom';
import './styles/SpecCourseStyles.css';
import {ReactComponentWithRestExample} from "./component/ReactComponentWithRestExample";
import {ReactComponentWithNomenclature} from "./component/ReactComponentWithNomenclature";
import Menu from "./component/Menu";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

console.log('hello from js world!');

const ReactApp = () => {
    return (
         // <div>
         //      <hr />
         //      ReactComponentWithNomenclature:
         //      <ReactComponentWithNomenclature />
         //  </div>
        <Router>
             <Menu />
             <Routes>
                 <Route path="/nomenclature" element={<ReactComponentWithNomenclature />} />
                 <Route path="/items" element={<ReactComponentWithRestExample />} />
                 <Route path="/requests" element={<ReactComponentWithRestExample />} />
             </Routes>
        </Router>
    )
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));