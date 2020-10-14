import * as React from "react";
import { Button } from "react-bootstrap";
import "./App.scss";
import Display from "../containers/Display";
import Ram from "../containers/Ram";
import Register from "../containers/Register";

const component: React.FC = () => (
    <>
        <h1>CHIP-8 emulator</h1>
        <div>
            <Button variant="primary">Primary</Button>
        </div>
        <Display />
        <Register />
        <Ram />
    </>
);

export default component;
