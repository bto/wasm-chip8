import { reducerWithInitialState } from "typescript-fsa-reducers";
import actions from "./actions";

export const reducer = reducerWithInitialState([] as number[]).case(
    actions.set,
    (_, ram) => ram
);

export default reducer;
