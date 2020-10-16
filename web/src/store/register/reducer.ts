import { reducerWithInitialState } from "typescript-fsa-reducers";
import actions from "./actions";

export const reducer = reducerWithInitialState({
    i: 0,
    sp: 0,
    pc: 0,
    v: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
})
    .case(actions.setI, (state, i) => ({ ...state, i }))
    .case(actions.setPC, (state, pc) => ({ ...state, pc }))
    .case(actions.setSP, (state, sp) => ({ ...state, sp }))
    .case(actions.setV, (state, v) => ({ ...state, v }));

export default reducer;