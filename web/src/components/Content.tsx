import * as React from "react";
import { Display, Ram, Register } from "../containers";

const component: React.FC = () => (
    <div className="container-fluid">
        <Display />
        <Ram />
        <Register />
    </div>
);

export default component;
