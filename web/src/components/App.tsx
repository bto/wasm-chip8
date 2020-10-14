import * as React from "react";
import "./style.scss";
import Display from "../containers/Display";
import Ram from "../containers/Ram";
import Register from "../containers/Register";

const component: React.FC = () => (
    <div className="container">
        <h1>CHIP-8 emulator</h1>
        <div className="row">
            <div className="col-lg-6 col-sm-12">
                <Display />
            </div>
            <div className="col-lg-3 col-sm-6">
                <Ram />
            </div>
            <div className="col-lg-3 col-sm-6">
                <Register />
            </div>
        </div>
    </div>
);

export default component;
