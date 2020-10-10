import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("vram");

export const actions = {
    set: actionCreator<string>("SET"),
};

export default actions;
