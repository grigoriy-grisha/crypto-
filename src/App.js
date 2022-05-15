import React from "react";
import {BrowserRouter} from "react-router-dom";
import Site from "./Site";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Site/>
            </BrowserRouter>
        </div>
    );
}

export default App;
