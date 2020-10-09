import * as React from "react";
import * as ReactRedux from "react-redux";
import Component from "../components/Register";
import { State } from "../redux";

const container: React.FC = () => {
    const register = ReactRedux.useSelector((state: State) => state.register);

    return <Component register={register} />;
};

export default container;
