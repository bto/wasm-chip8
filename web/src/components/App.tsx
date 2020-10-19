import * as React from "react";
import "./style.scss";
import { Header } from "./";
import { Display, Ram, Register } from "../containers";

const component: React.FC = () => (
    <div className="c-app">
        <div className="c-sidebar">Sidebar</div>
        <div className="c-wrapper">
            <Header />
            <div className="c-body">
                <main className="c-main">
                    <div className="col-lg-6 col-sm-12">
                        <Display />
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <Ram />
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <Register />
                    </div>
                </main>
            </div>
        </div>
    </div>
);

export default component;
