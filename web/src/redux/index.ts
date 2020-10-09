import * as Redux from "redux";
import * as register from "./register";
import * as vram from "./vram";

export const reducer = Redux.combineReducers({
    register: register.reducer,
    vram: vram.reducer,
});

export const actions = {
    register: register.actions,
    vram: vram.actions,
};

export type State = ReturnType<typeof reducer>;

export const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
