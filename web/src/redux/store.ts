import * as Redux from "redux";
import AppAction from "./action";
import AppReducer from "./reducer";
import AppState from "./state";

const store: Redux.Store<AppState, AppAction> = Redux.createStore(AppReducer);

export default store;
