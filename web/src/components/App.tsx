import * as React from "react";
import Display from "../containers/Display";
import Register from "../containers/Register";

const component: React.FC = () => (
    <div>
        <h1>CHIP-8 emulator</h1>
        <Display />
        <Register />
    </div>
);

export default component;
