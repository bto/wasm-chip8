import { reducerWithInitialState } from "typescript-fsa-reducers";
import actions from "./actions";
import State from "./state";

const initState: State = {
    message: "",
};

export const reducer = reducerWithInitialState(initState).case(
    actions.send,
    (state, message) => ({ ...state, message })
);

export default reducer;
