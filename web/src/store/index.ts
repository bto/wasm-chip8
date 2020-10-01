import * as Redux from "redux";
import State from "./state";
import reducer from "./reducer";

const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
