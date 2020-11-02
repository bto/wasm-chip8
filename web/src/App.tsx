import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import App from "./components/App";
import store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <ReactRedux.Provider store={store}>
            <App />
        </ReactRedux.Provider>
    </React.StrictMode>,
    document.getElementById("app")
);
