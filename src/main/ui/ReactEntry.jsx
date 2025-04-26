import React from "react";
import * as ReactDOM from 'react-dom';
import './styles/SpecCourseStyles.css';
import {ReactComponentWithRestExample} from "./component/ReactComponentWithRestExample";
import {ReactComponentWithNomenclature} from "./component/ReactComponentWithNomenclature";
import {ReactComponentWithItems} from "./component/ReactComponentWithItems";
import {ReactComponentWithRequests} from "./component/ReactComponentWithRequests";
import {RequestPage} from "./component/RequestPage";
import Menu from "./component/Menu";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

console.log('hello from js world!');

const ReactApp = () => {
    return (
        <Router>
            <Menu />
            <Routes>
                    <Route path="/store/nomenclature" element={<ReactComponentWithNomenclature />} />
                    <Route path="/store/items" element={<ReactComponentWithItems />} />
                    <Route path="/store/requests" element={<ReactComponentWithRequests />} />
                <Route path="/store/requests/add" element={<RequestPage />} />
                <Route path="/store/requests/:id" element={<RequestPage />} />
                <Route path="/user"/>
            </Routes>
        </Router>
)
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));