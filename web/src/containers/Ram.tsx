import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Ram";
import { State } from "../store";

export type Props = {
    pc: number;
    ram: number[];
};

const container: React.FC = () => {
    const ram = ReactRedux.useSelector((state: State) => state.ram);
    const pc = ReactRedux.useSelector((state: State) => state.register.pc);

    return <Component pc={pc} ram={ram} />;
};

export default container;
