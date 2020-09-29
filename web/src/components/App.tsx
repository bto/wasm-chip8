import * as React from "react";
import * as ReactRedux from "react-redux";
import store from "../store";

const App: React.FC = () => (
    <ReactRedux.Provider store={store}>
        <div>App</div>
    </ReactRedux.Provider>
);

export default App;
