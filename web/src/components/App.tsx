import * as React from "react";
import "./style.scss";
import { Content, Header } from "./";

const component: React.FC = () => (
    <div className="c-app">
        <div className="c-sidebar">Sidebar</div>
        <div className="c-wrapper">
            <Header />
            <div className="c-body">
                <Content />
            </div>
        </div>
    </div>
);

export default component;
