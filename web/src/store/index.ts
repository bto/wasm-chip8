import * as Redux from "redux";
import reducer, { State } from "./reducer";

const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
