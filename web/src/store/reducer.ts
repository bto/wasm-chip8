import * as Redux from "redux";
import messageReducer from "./message/reducer";

export default Redux.combineReducers({
    message: messageReducer,
});
