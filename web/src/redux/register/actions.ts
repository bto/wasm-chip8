import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("register");

export default {
    setI: actionCreator<number>("SET_I"),
    setPC: actionCreator<number>("SET_PC"),
    setSP: actionCreator<number>("SET_SP"),
};
