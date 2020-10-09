import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import App from "./App";
import store from "../redux";

ReactDOM.render(
    <React.StrictMode>
        <ReactRedux.Provider store={store}>
            <App />
        </ReactRedux.Provider>
    </React.StrictMode>,
    document.getElementById("app")
);
