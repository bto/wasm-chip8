import { reducerWithInitialState } from "typescript-fsa-reducers";
import actions from "./actions";

export const reducer = reducerWithInitialState([]).case(
    actions.set,
    (_, ram) => ram
);

export default reducer;
