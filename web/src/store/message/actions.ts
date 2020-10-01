import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("message");

export const actions = {
    send: actionCreator<string>("SEND"),
};

export default actions;
