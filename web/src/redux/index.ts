import * as Redux from "redux";
import * as vram from "./vram";

export const reducer = Redux.combineReducers({
    vram: vram.reducer,
});

export const actions = {
    vram: vram.actions,
};

export type State = ReturnType<typeof reducer>;

export const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
