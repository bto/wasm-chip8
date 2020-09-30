import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const actions = {
    send: actionCreator<string>("SEND"),
};

export default actions;
