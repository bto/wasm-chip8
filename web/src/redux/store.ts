import * as Redux from "redux";
import { State, reducer } from "./reducer";

export type AppState = {
    state: State;
};

const store: Redux.Store<AppState, Redux.Action> = Redux.createStore(reducer);

export default store;
