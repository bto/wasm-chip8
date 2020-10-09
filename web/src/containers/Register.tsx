import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Register";
import { State } from "../store";

const container: React.FC = () => {
    const register = ReactRedux.useSelector((state: State) => state.register);

    return <Component i={register.i} pc={register.pc} sp={register.sp} />;
};

export default container;
