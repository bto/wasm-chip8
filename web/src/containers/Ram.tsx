import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Ram";
import Module from "../modules/Ram";
import { State } from "../store";

export type Props = {
    mod: Module;
    pc: number;
    ram: number[];
};

const container: React.FC = () => {
    const mod = new Module();
    const ram = ReactRedux.useSelector((state: State) => state.ram);
    const pc = ReactRedux.useSelector((state: State) => state.register.pc);

    return <Component mod={mod} pc={pc} ram={ram} />;
};

export default container;
