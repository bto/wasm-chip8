import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("vram");

export default {
    set: actionCreator<string>("SET"),
};
