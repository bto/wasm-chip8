import * as Redux from "redux";
import messageReducer from "./message/reducer";
import messageAction from "./message/Action";

const reducer = Redux.combineReducers({
    message: messageReducer,
});

export type State = ReturnType<typeof reducer>;

export type Action = messageAction;

const store: Redux.Store<State, Action> = Redux.createStore(reducer);

export default store;
