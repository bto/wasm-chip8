import * as Redux from "redux";
import AppActionType from "./actionType";

export interface AppActionTest extends Redux.Action {
    type: AppActionType.TEST_TEXT;
    payload: {
        text: string;
    };
}

export type AppAction = AppActionTest;

export default AppAction;
