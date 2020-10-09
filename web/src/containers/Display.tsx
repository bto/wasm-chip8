import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Display";
import { State } from "../store";

const container: React.FC = () => {
    const display = ReactRedux.useSelector(
        (state: State) => state.vram.display
    );

    return <Component display={display} />;
};

export default container;
