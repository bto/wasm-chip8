import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Ram";
import { State } from "../store";

export type Props = {
    ram: number[];
};

const container: React.FC = () => {
    const ram = ReactRedux.useSelector((state: State) => state.ram);

    return <Component ram={ram} />;
};

export default container;
