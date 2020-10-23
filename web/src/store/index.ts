import * as Redux from "redux";
import * as ram from "./ram";
import * as register from "./register";

export const reducer = Redux.combineReducers({
    ram: ram.reducer,
    register: register.reducer,
});

export const actions = {
    ram: ram.actions,
    register: register.actions,
};

export type State = ReturnType<typeof reducer>;

export const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
