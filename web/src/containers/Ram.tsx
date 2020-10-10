import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Ram";
import { State } from "../store";

const container: React.FC = () => {
    const ram = ReactRedux.useSelector((state: State) => state.ram);
    const pc = ReactRedux.useSelector((state: State) => state.register.pc);

    return <Component ram={ram} pc={pc} />;
};

export default container;
