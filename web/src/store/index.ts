import * as Redux from "redux";
import Action from "./Action";
import State from "./State";
import reducer from "./reducer";

const store: Redux.Store<State, Action> = Redux.createStore(reducer);

export default store;
