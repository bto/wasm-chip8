import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("ram");

export const actions = {
    set: actionCreator<number[]>("SET"),
};

export default actions;
