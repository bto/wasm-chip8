import * as Redux from "redux";
import * as ram from "./ram";
import * as register from "./register";
import * as vram from "./vram";

export const reducer = Redux.combineReducers({
    ram: ram.reducer,
    register: register.reducer,
    vram: vram.reducer,
});

export const actions = {
    ram: ram.actions,
    register: register.actions,
    vram: vram.actions,
};

export type State = ReturnType<typeof reducer>;

export const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
