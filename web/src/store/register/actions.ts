import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("register");

export const actions = {
    setI: actionCreator<number>("SET_I"),
    setPC: actionCreator<number>("SET_PC"),
    setSP: actionCreator<number>("SET_SP"),
    setV: actionCreator<number[]>("SET_V"),
};

export default actions;
