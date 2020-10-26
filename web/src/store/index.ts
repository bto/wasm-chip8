import * as ReduxToolkit from "@reduxjs/toolkit";
import ram from "./ram";
import register from "./register";

export const reducer = ReduxToolkit.combineReducers({
    ram: ram.reducer,
    register: register.reducer,
});

export const actions = {
    ram: ram.actions,
    register: register.actions,
};

export type State = ReturnType<typeof reducer>;

export const store = ReduxToolkit.configureStore<State>({
    reducer,
});

export default store;
