import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Register";
import { State } from "../store";

export type Props = {
    i: number;
    pc: number;
    sp: number;
    v: number[];
};

const container: React.FC = () => {
    const register = ReactRedux.useSelector((state: State) => state.register);

    return (
        <Component
            i={register.i}
            pc={register.pc}
            sp={register.sp}
            v={register.v}
        />
    );
};

export default container;
