import * as Redux from "redux";
import message from "./message/reducer";

export const reducer = Redux.combineReducers({
    message,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
