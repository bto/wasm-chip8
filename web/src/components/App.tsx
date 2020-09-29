import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import store from "../redux/store";

const App: React.FC = () => (
    <ReactRedux.Provider store={store}>
        <div>App</div>
    </ReactRedux.Provider>
);

ReactDOM.render(<App />, document.getElementById("app"));
