import * as Redux from "redux";
import messageActions from "./message/actions";
import messageReducer from "./message/reducer";

export const reducer = Redux.combineReducers({
    message: messageReducer,
});

export type State = ReturnType<typeof reducer>;

export const actions = {
    message: messageActions,
};

const store: Redux.Store<State> = Redux.createStore(reducer);

export default store;
