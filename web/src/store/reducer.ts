import * as Redux from "redux";
import State from "./state";
import message from "./message/reducer";

export const reducer = Redux.combineReducers<State>({
    message,
});

export default reducer;
