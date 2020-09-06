import * as React from "react";
import * as ReactDOM from "react-dom";
import { SubComponent } from "./sub-component";
import "./index.scss";

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello React!</h1>
                <SubComponent name="My Counter for TypeScript" />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));

const wasm = import("./wasm/chip8");
wasm.then((mod) => {
    mod.greet("foo");
});
