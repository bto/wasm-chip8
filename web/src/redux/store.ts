import * as Redux from "redux";
import { AppAction } from "./action";
import { State, reducer } from "./reducer";

export type AppState = {
    state: State;
};

const store: Redux.Store<AppState, AppAction> = Redux.createStore(reducer);

export default store;
