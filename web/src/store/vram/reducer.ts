import { reducerWithInitialState } from "typescript-fsa-reducers";
import actions from "./actions";

export const reducer = reducerWithInitialState({
    display: "",
}).case(actions.set, (state, display) => ({ ...state, display }));

export default reducer;
