import * as Redux from "redux";
import messageReducer from "./message/reducers";

const reducer = Redux.combineReducers({
    message: messageReducer,
});

export type State = ReturnType<typeof reducer>;

const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
