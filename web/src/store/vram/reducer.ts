import { reducerWithInitialState } from "typescript-fsa-reducers";
import actions from "./actions";

export default reducerWithInitialState({
    display: "",
}).case(actions.set, (state, display) => ({ ...state, display }));
