import * as Redux from "redux";
import messageAction from "./message/action";
import messageReducer from "./message/reducer";

const reducer = Redux.combineReducers({
    message: messageReducer,
});

type State = ReturnType<typeof reducer>;

type Action = messageAction;

const store: Redux.Store<State, Action> = Redux.createStore(reducer);

export default store;
