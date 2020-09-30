import { reducerWithInitialState } from "typescript-fsa-reducers";
import actions from "./actions";
import State from "./State";

const initState: State = {
    message: "",
};

export const reducers = reducerWithInitialState(initState).case(
    actions.send,
    (state, message) => ({ ...state, message })
);

export default reducers;
